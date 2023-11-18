import {useId,DraggableView,useSwipeGesture} from "vritra";
import css from "./ModelCard.module.css";
import StateView from "./StateView/StateView";


export default function ModelCard(props){
    const {parent,id=useId("modelcard"),style,model,onDealt,onFocus,onBlur}=props;
    const modelcard=DraggableView({
        parent,id,
        style:styles.modelcard(model.photo)+";"+(style||""),
        className:css.modelcard,
        boundary:{ymin:-10*rem,ymax:10*rem},
        onDrag:()=>{
            modelcard.style.transition="0ms";
        },onMove,
        onDrop:(...args)=>{
            modelcard.style.transition=null;
            onDrop(args);
        },
    }),state={
        stateview:null,
        accepted:null,
        focused:false,
        left:0,
    };

    modelcard.innateHTML=`
    `;

    useSwipeGesture({
        element:modelcard,
        onSwipe:(event)=>{if(Math.abs(event.dx)<statics.dismax){
            const {focused}=state,{style}=modelcard;
            if((!focused)&&(event.direction==="top")){
                state.focused=true;
                state.left=style.left;
                modelcard.setPosition({x:0,y:0,duration:statics.backduration},false);
                modelcard.setEventListener("move",()=>{
                    modelcard.setPosition({x:0},false);
                });
                modelcard.setEventListener("drop",({dy})=>{
                    (dy<50)&&modelcard.setPosition({y:0,duration:statics.backduration});
                });
                style.animation=`${css.fullview} ${statics.focusduration}ms ease-in-out 1 normal forwards`;
                setTimeout(()=>{
                    Object.assign(style,{
                        width:"100%",
                        height:"100%",
                        left:0,
                        top:0,
                        animation:null,
                    });
                },statics.focusduration+50);
                onFocus&&onFocus();
            }
            else if(focused&&(event.direction==="bottom")){
                state.focused=false;
                modelcard.setPosition({y:0,duration:statics.focusduration},false);
                style.left=state.left;
                style.animation=`${css.fullview} ${statics.focusduration}ms ease-in-out 1 reverse forwards`;
                setTimeout(()=>{
                    Object.assign(style,{
                        width:null,
                        height:null,
                        top:null,
                        animation:null,
                    });
                    modelcard.setEventListener("move",onMove);
                    modelcard.setEventListener("drop",onDrop)
                },statics.focusduration+50);
                onBlur&&onBlur();
            }
        }},
    });

    function onMove({x}){
        if(x>statics.dismax){state.accepted=true}
        else if(x<-statics.dismax){state.accepted=false}
        else{state.accepted=null}
        const {accepted}=state;
        if(accepted!==null){
            state.stateview=StateView({parent:modelcard,accepted});
            modelcard.setEventListener("move",({x})=>{
                let unkown=(x<statics.dismax)&&(x>-statics.dismax);
                if(unkown){
                    const {stateview}=state;
                    if(stateview){
                        state.stateview=null;
                        stateview.unmount();
                    }
                    modelcard.setEventListener("move",onMove);
                }
            });
        }
    }

    function onDrop(){
        const {accepted,stateview}=state;
        if((typeof(accepted)==="boolean")){
            const diagonal=Math.sqrt(modelcard.clientWidth**2+modelcard.clientHeight**2);
            const rad=(45-statics.angle)*Math.PI/180;
            const width=diagonal*Math.cos(rad);
            const offset=(width+(window.innerWidth-modelcard.clientWidth)/2)/rem;
            Object.assign(modelcard.style,{
                transition:`${statics.slideduration}ms`,
                transform:`
                    translateX(${accepted?"":"-"}${offset}rem) 
                    rotateZ(${accepted?"-":""}${statics.angle}deg)
                `,
            });
            setTimeout(()=>{modelcard.remove()},statics.slideduration+50);
            onDealt&&onDealt();
        }
        else{
            if(stateview){
                state.stateview=null;
                stateview.unmount();
            }
            modelcard.setEventListener("move",onMove);
            modelcard.setPosition({x:0,y:0,duration:statics.backduration});
        }
    }


    return modelcard;
}

const statics={
    dismax:10*rem,
    angle:45,
    backduration:300,
    focusduration:500,
    slideduration:1000,
},styles={
    modelcard:(photo)=>`
        background-image:url(${photo});
        transition:${statics.slideduration}ms;
    `,
}

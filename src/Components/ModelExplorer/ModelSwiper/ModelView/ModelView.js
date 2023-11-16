import {useId,DraggableView,useSwipeGesture} from "vritra";
import css from "./ModelView.module.css";
import StateView from "./StateView/StateView";


export default function ModelView(props){
    const {parent,id=useId("modelview"),style,model,onDealt,onFocus,onBlur}=props;
    const modelview=DraggableView({
        parent,id,
        style:styles.modelview(model.photo)+";"+(style||""),
        className:css.modelview,
        boundary:{ymin:-10*rem,ymax:10*rem},
        onMove,onDrop,
    }),state={
        stateview:null,
        accepted:null,
        focused:false,
        left:0,
    };

    modelview.innateHTML=`
    `;

    useSwipeGesture({
        element:modelview,
        onSwipe:(event)=>{if(Math.abs(event.dx)<statics.dismax){
            const {focused}=state,{style}=modelview;
            if((!focused)&&(event.direction==="top")){
                state.focused=true;
                state.left=style.left;
                modelview.setPosition({x:0,y:0,duration:statics.backduration},false);
                modelview.setEventListener("move",()=>{
                    modelview.setPosition({x:0},false);
                });
                modelview.setEventListener("drop",({dy})=>{
                    (dy<50)&&modelview.setPosition({y:0,duration:statics.backduration});
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
                modelview.setPosition({y:0,duration:statics.focusduration},false);
                style.left=state.left;
                style.animation=`${css.fullview} ${statics.focusduration}ms ease-in-out 1 reverse forwards`;
                setTimeout(()=>{
                    Object.assign(style,{
                        width:null,
                        height:null,
                        top:null,
                        animation:null,
                    });
                    modelview.setEventListener("move",onMove);
                    modelview.setEventListener("drop",onDrop)
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
            state.stateview=StateView({parent:modelview,accepted});
            modelview.setEventListener("move",({x})=>{
                let unkown=(x<statics.dismax)&&(x>-statics.dismax);
                if(unkown){
                    const {stateview}=state;
                    if(stateview){
                        state.stateview=null;
                        stateview.unmount();
                    }
                    modelview.setEventListener("move",onMove);
                }
            });
        }
    }

    function onDrop(){
        const {accepted,stateview}=state;
        if((typeof(accepted)==="boolean")){
            const diagonal=Math.sqrt(modelview.clientWidth**2+modelview.clientHeight**2);
            const rad=(45-statics.angle)*Math.PI/180;
            const width=diagonal*Math.cos(rad);
            const offset=(width+(window.innerWidth-modelview.clientWidth)/2)/rem;
            Object.assign(modelview.style,{
                transition:`${statics.slideduration}ms`,
                transform:`
                    translateX(${accepted?"":"-"}${offset}rem) 
                    rotateZ(${accepted?"-":""}${statics.angle}deg)
                `,
            });
            setTimeout(()=>{modelview.remove()},statics.slideduration+50);
            onDealt&&onDealt();
        }
        else{
            if(stateview){
                state.stateview=null;
                stateview.unmount();
            }
            modelview.setEventListener("move",onMove);
            modelview.setPosition({x:0,y:0,duration:statics.backduration});
        }
    }


    return modelview;
}

const statics={
    dismax:10*rem,
    angle:45,
    backduration:300,
    focusduration:500,
    slideduration:1000,
},styles={
    modelview:(photo)=>`
        background-image:url(${photo});
    `,
}

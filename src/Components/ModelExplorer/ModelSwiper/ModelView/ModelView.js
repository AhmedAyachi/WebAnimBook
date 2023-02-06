import {useId,DraggableView} from "cherries";
import css from "./ModelView.module.css";
import StateView from "./StateView/StateView";


export default function ModelView(props){
    const {parent,id=useId("modelview"),style,model}=props,state={
        stateview:null,
    };
    const modelview=DraggableView({
        parent,id,style,
        className:css.modelview,
        onMove:onMove,
        onDrop:({dx})=>{
            const {stateview}=state;
            if(stateview){
                state.stateview=null;
                stateview.unmount();
            }
            modelview.setEventListener("move",onMove);
            if((dx<statics.dismax)&&(dx>-statics.dismax)){
                modelview.setPosition({x:0,y:0,duration:statics.duration-50});
            }
        },
    });

    modelview.innateHTML=`
        <img class="${css.photo}" src="${model.photo}"/>
    `;

    function onMove({dx},element){
        let accepted;
        if(dx>statics.dismax){accepted=true}
        else if(dx<-statics.dismax){accepted=false}
        if(accepted!==undefined){
            state.stateview=StateView({parent:element,accepted});
            element.setEventListener("move",({dx})=>{
                let unkown=(dx<statics.dismax)&&(dx>-statics.dismax);
                if(unkown){
                    const {stateview}=state;
                    if(stateview){
                        state.stateview=null;
                        stateview.unmount();
                    }
                    element.setEventListener("move",onMove);
                }
            });
        }
    }


    return modelview;
}

const statics={
    dismax:15*rem,
    ...StateView.statics,
}

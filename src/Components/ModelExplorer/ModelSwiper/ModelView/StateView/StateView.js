import {useId,View,fadeIn,fadeOut} from "cherries";
import css from "./StateView.module.css";
import {check0,cross0} from "assets";


export default function StateView(props){
    const {parent,id=useId("stateview"),accepted}=props;
    const stateview=View({parent,id,className:css.stateview});

    stateview.innateHTML=`
        <div class="${css.container}" style="${styles.container(accepted)}">
            <img class="${css.icon}" src="${(accepted?check0:cross0)("white")}"/>
        </div>
    `;

    stateview.unmount=()=>{
        fadeOut(stateview,statics.duration,()=>{
            stateview.remove();
        });
    }
    fadeIn(stateview,statics.duration);
    return stateview;
}

const statics={
    duration:150,
},styles={
    container:(accepted)=>`
        background-color:${accepted?"#21865a":"#fb004c"};
    `,
}

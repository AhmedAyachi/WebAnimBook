import {View} from "vritra";
import css from "./ControlView.module.css";
import {skip0,pause0,resume0} from "assets";


export default function ControlView(props){
    const {parent}=props;
    const controlview=View({parent,className:css.controlview}),state={
        paused:true,
    };

    controlview.innateHTML=`
        <div class="${css.playbtns}">
            <img ref="backbtn" class="button ${css.skipbtn}" src="${skip0("white")}"/>
            <img ref="togglebtn" class="button ${css.togglebtn}"/>
            <img 
                ref="nextbtn" 
                class="button ${css.skipbtn}" 
                style="transform:rotateZ(180deg)" 
                src="${skip0("white")}"
            />
        </div>
    `;
    
    const {togglebtn}=controlview;
    togglebtn.onclick=()=>{
        state.paused=!state.paused;
        togglebtn.src=(state.paused?resume0:pause0)("white");
    }
    togglebtn.onclick();

    return controlview;
}

import {View} from "vritra";
import css from "./HeaderView.module.css";
import {chevron0,dots0} from "assets";


export default function HeaderView(props){
    const {parent}=props;
    const headerview=View({parent,at:"start",className:css.headerview});

    headerview.innateHTML=`
        <img ref="dismissbtn" class="button ${css.action}" src="${chevron0("white")}"/>
        <h3 class="${css.title}">daily mix 4</h3>
        <img 
            ref="menubtn" class="button ${css.action}" 
            style="${styles.menubtn()}"
            src="${dots0("white",1.25)}"
        />
    `;

    return headerview;
}

const styles={
    menubtn:()=>cordova.platformId==="android"?`
        transform:rotateZ(90deg) translateY(-50%);
    `:"",
}

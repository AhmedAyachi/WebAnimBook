import {View} from "vritra";
import css from "./BackgroundView.module.css";


export default function BackgroundView(props){
    const {parent}=props;
    const backgroundview=View({parent,className:css.backgroundview});

    backgroundview.innateHTML=`
        <div class="${css.mask}"></div>
    `;

    backgroundview.setColor=(color)=>{
        backgroundview.style.backgroundColor=color;
    }

    return backgroundview;
}

import {useId,View} from "vritra";
import css from "./ScreenView.module.css";


export default function ScreenView(props){
    const {parent,id=useId("screenview")}=props;
    const screenview=View({parent,id,className:`${css.screenview} ${props.className||""}`});

    screenview.innateHTML=`
    `;

    return screenview;
}

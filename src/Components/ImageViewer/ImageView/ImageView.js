import {useId,View,useZoomGesture} from "vritra";
import css from "./ImageView.module.css";


export default function ImageView(props){
    const {parent,id=useId("imageview"),image,zoomable,onClick}=props;
    const imageview=View({parent,id,className:`${css.imageview} ${props.className||""}`});

    imageview.innateHTML=`
        <img src="${image}" alt="" loading="lazy"/>
    `;

    zoomable&&useZoomGesture({element:imageview.querySelector(":scope>img")});

    imageview.onclick=onClick;

    return imageview;
}



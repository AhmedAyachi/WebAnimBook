import {useId,View,DraggableView} from "vritra";
import css from "./ColorSlider.module.css";


export default function ColorSlider(props){
    const {parent,id=useId("colorslider"),onColorChange}=props;
    const colorslider=View({parent,id,className:css.colorslider}),state={
        boundary:{
            xmin:-7,
            xmax:colorslider.clientWidth-7.42*rem+7,
        }
    },{boundary}=state;

    colorslider.innateHTML=`
    `;
    const pinEl=DraggableView({
        parent:colorslider,
        className:css.pin,
        verticalDrag:false,
        boundary,
        onMove:({x})=>{
            const color=`hsl(${(x+radius)/colorslider.clientWidth*360},100%,50%)`;
            pinEl.style.backgroundColor=color;
            onColorChange&&onColorChange(color);
        },
    });

    const {left}=colorslider.getBoundingClientRect(),radius=pinEl.clientWidth/2;
    colorslider.ontouchstart=({touches})=>{
        const [{clientX}]=touches;
        const x=clientX-left-radius;
        pinEl.setPosition({x,y:-40,asratio:false,duration:150});
    }
    colorslider.ontouchmove=({touches})=>{
        const [{clientX}]=touches;
        const x=clientX-left-radius;
        (boundary.xmin<x)&&(x<boundary.xmax)&&pinEl.setPosition({x,asratio:false});
    }
    colorslider.ontouchend=()=>{
        pinEl.setPosition({y:0,duration:150});
    }

    return colorslider;
}

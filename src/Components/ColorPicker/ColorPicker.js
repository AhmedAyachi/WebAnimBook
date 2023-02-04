import {useId,View} from "cherries";
import css from "./ColorPicker.module.css";
import ColorSlider from "./ColorSlider/ColorSlider";


export default function ColorPicker(props){
    const {parent,id=useId("colorpicker")}=props;
    const colorpicker=View({parent,id,className:`${css.colorpicker} ${props.className}`});

    colorpicker.innateHTML=`
        <div class="${css.color}"></div>
    `;
    const colorEl=colorpicker.querySelector(`.${css.color}`);
    ColorSlider({
        parent:colorpicker,
        onColorChange:(color)=>{
            colorEl.style.backgroundColor=color;
        },
    });

    return colorpicker;
}



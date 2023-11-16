import {useId,View} from "vritra";
import css from "./ModelSwiper.module.css";
import ModelView from "./ModelView/ModelView";


export default function ModelSwiper(props){
    const {parent,id=useId("modelswiper"),models,onChange,onFocus,onBlur}=props;
    const modelswiper=View({parent,id,className:css.modelswiper});

    modelswiper.innateHTML=`
    `;

    models&&models.forEach((model,i)=>{
        const itolast=models.length-(i+1);
        ModelView({
            parent:modelswiper,model,
            style:styles.modelview(itolast),
            onDealt:onChange&&(()=>{onChange(models[i+1])}),
            onFocus:onFocus&&(()=>{onFocus(model)}),
            onBlur:onBlur&&(()=>{onBlur(model)}),
        });
    });

    return modelswiper;
}

const styles={
    modelview:(itolast)=>`
        left:${itolast*3}em;
        z-index:${itolast};
    `,
}

import {useId,View,fadeIn} from "vritra";
import css from "./ModelSwiper.module.css";
import ModelView from "./ModelView/ModelView";


export default function ModelSwiper(props){
    const {parent,id=useId("modelswiper"),onChange,onFocus,onBlur}=props;
    const modelswiper=View({parent,id,className:css.modelswiper}),state={
        models:[],
    },{models}=state;

    modelswiper.innateHTML=`
    `;

    function addModel(model,fadeDuration){
        models.unshift(model);
        model.element=ModelView({
            parent:modelswiper,model,
            onDealt:onChange&&(()=>{
                models.pop();
                addModel(model,1000);
                const index=models.indexOf(model);
                onChange(models[index+1]);
            }),
            onFocus:onFocus&&(()=>{onFocus(model)}),
            onBlur:onBlur&&(()=>{onBlur(model)}),
        });
        models.forEach(({element},i)=>{
            const itolast=i;
            Object.assign(element.style,styles.modelview(itolast));
        });
        fadeDuration&&fadeIn(model.element,fadeDuration);
    }
    props.models?.forEach(model=>{addModel(model)});
    

    return modelswiper;
}

const styles={
    modelview:(itolast)=>({
        left:`${itolast*3}em`,
        zIndex:itolast,
    }),
}

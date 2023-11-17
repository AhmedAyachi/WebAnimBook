import {useId,View} from "vritra";
import css from "./ModelSwiper.module.css";
import ModelView from "./ModelView/ModelView";


export default function ModelSwiper(props){
    const {parent,id=useId("modelswiper"),onChange,onFocus,onBlur}=props;
    const modelswiper=View({parent,id,className:css.modelswiper}),state={
        models:[],
    },{models}=state;

    modelswiper.innateHTML=`
    `;

    function addModel(model){
        models.unshift(model);
        model.element=ModelView({
            parent:modelswiper,model,
            onDealt:onChange&&(()=>{
                models.pop();
                addModel(model);
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
    }
    props.models?.forEach(addModel);
    

    return modelswiper;
}

const styles={
    modelview:(itolast)=>({
        left:`${itolast*3}em`,
        zIndex:itolast,
    }),
}

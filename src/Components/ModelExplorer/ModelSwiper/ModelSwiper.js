import {View,fadeIn} from "vritra";
import css from "./ModelSwiper.module.css";
import ModelCard from "./ModelCard/ModelCard";


export default function ModelSwiper(props){
    const {parent,onChange,onFocus,onBlur}=props;
    const modelswiper=View({parent,className:css.modelswiper}),state={
        models:[],
    },{models}=state;

    modelswiper.innateHTML=`
    `;
    
    setTimeout(()=>{
        let {width,height}=modelswiper.getBoundingClientRect();
        width=100*width/window.innerWidth;
        height=100*height/window.innerWidth;
        modelswiper.style.setProperty("--cardWidth",width+"em");
        modelswiper.style.setProperty("--cardHeight",Math.max(height,width)+"em");
        props.models?.forEach(model=>{addModel(model)});
    },0);
    function addModel(model,fadeDuration){
        models.unshift(model);
        model.element=ModelCard({
            parent:modelswiper,model,
            onDealt:()=>{
                models.pop();
                addModel(model,1000);
                if(onChange){
                    const index=models.indexOf(model);
                    onChange&&onChange(models[index+1]);
                }
            },
            onFocus:onFocus&&(()=>{onFocus(model)}),
            onBlur:onBlur&&(()=>{onBlur(model)}),
        });
        models.forEach(({element},i)=>{
            const itolast=i;
            Object.assign(element.style,styles.modelcard(itolast));
        });
        fadeDuration&&fadeIn(model.element,fadeDuration);
    }

    return modelswiper;
}

const styles={
    modelcard:(itolast)=>({
        left:`${itolast*3}em`,
        zIndex:itolast,
    }),
}

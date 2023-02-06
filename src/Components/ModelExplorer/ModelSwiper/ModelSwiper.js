import {useId,View} from "cherries";
import css from "./ModelSwiper.module.css";
import ModelView from "./ModelView/ModelView";


export default function ModelSwiper(props){
    const {parent,id=useId("modelswiper"),models}=props;
    const modelswiper=View({parent,id,className:css.modelswiper});

    modelswiper.innateHTML=`
    `;

    models&&models.forEach((model,i)=>{
        ModelView({parent:modelswiper,style:styles.modelview(i,models.length),model});
    });

    return modelswiper;
}

const styles={
    modelview:(index,modelcount)=>`
        left:${modelcount-index}em;
        z-index:${modelcount-index};
    `,
}

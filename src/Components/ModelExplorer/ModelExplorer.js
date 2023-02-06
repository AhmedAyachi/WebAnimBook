import {useId,View} from "cherries";
import css from "./ModelExplorer.module.css";
import {model0,model1,model2,list0} from "assets";
import ModelSwiper from "./ModelSwiper/ModelSwiper";


export default function ModelExplorer(props){
    const {parent,id=useId("modelexplorer")}=props;
    const modelexplorer=View({parent,id,className:css.modelexplorer});

    modelexplorer.innateHTML=`
        <div class="${css.header}">
            <img class="${css.icon}" src="${list0("white")}"/>
            <span class="${css.title}">zick</span>
        </div>
    `;
    ModelSwiper({parent:modelexplorer,models:statics.models});

    return modelexplorer;
}

const statics={
    models:[
        {
            name:"mabel barry",
            age:28,
            description:"if you can pull me away from my philosophy books and scientific theories, i'm pretty low-key date",
            photo:model0,
        },
        {
            name:"jessica brown",
            age:26,
            description:"award-winning designer raised in australia, livin in New York",
            photo:model1,
        },
        {
            name:"ella myers",
            age:24,
            description:"perfectionistic, quirky and everybody's friend. Extroverted introvert with diverse range of interests",
            photo:model2,
        },
    ],
}

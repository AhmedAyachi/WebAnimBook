import {useId,View,fadeOut, fadeIn} from "cherries";
import css from "./ModelExplorer.module.css";
import ModelSwiper from "./ModelSwiper/ModelSwiper";
import ModelElector from "./ModelElector/ModelElector";
import {model0,model1,model2,list0} from "assets";


export default function ModelExplorer(props){
    const {parent,id=useId("modelexplorer")}=props;
    const modelexplorer=View({parent,id,className:css.modelexplorer});

    modelexplorer.innateHTML=`
        <div class="${css.header}">
            <img class="${css.icon}" src="${list0("white")}"/>
            <span class="${css.title}">zick</span>
        </div>
    `;
    ModelSwiper({
        parent:modelexplorer,
        models:statics.models,
        onChange:(model)=>{
            fadeOut(modelelctor,model&&(()=>{
                modelelctor=modelelctor.substitute(ModelElector({parent:modelexplorer,model}));
                fadeIn(modelelctor);
            }));
        },
        onFocus:()=>{modelelctor.toggleMore(true)},
        onBlur:()=>{modelelctor.toggleMore(false)},
    });
    let modelelctor=ModelElector({parent:modelexplorer,model:statics.models[0]});
    return modelexplorer;
}

const statics={
    models:[
        {
            name:"mabel berry",
            age:28,
            description:"if you can pull me away from my philosophy books and scientific theories, I'm a pretty low-key date",
            photo:model0,
            kmaway:3,
        },
        {
            name:"jessica brown",
            age:26,
            description:"award-winning designer raised in australia, livin in New York",
            photo:model1,
            kmaway:1.8,
        },
        {
            name:"ella myers",
            age:24,
            description:"perfectionistic, quirky and everybody's friend. Extroverted introvert with diverse range of interests",
            photo:model2,
            kmaway:0.4,
        },
    ],
}

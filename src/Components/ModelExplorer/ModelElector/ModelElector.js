import {useId,View} from "cherries";
import css from "./ModelElector.module.css";
import ChoiceView from "./ChoiceView/ChoiceView";
import {questionmark0,cross0,check0} from "assets";


export default function ModelElector(props){
    const {parent,id=useId("modelelector"),model}=props;
    const modelelector=View({parent,id,className:css.modelelector});

    modelelector.innateHTML=`
        <div class="${css.details}">
            <h3 class="${css.title}">${model.name}, ${model.age}</h3>
            <p class="${css.description}">${model.description}</p>
        </div>
        <div class="${css.choices}"></div>
    `;

    const choicesEl=modelelector.querySelector(`.${css.choices}`);
    statics.choices.forEach(choice=>{
        ChoiceView({parent:choicesEl,choice});
    });

    return modelelector;
}

const statics={
    choices:[
        {label:"nope",color:"#ff004d",icon:cross0},
        {label:"maybe",color:"#4599d7",icon:questionmark0},
        {label:"yes",color:"#208758",icon:check0},
    ],
}

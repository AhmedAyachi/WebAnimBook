import {useId,View,fadeIn,fadeOut} from "cherries";
import css from "./ModelElector.module.css";
import ChoiceView from "./ChoiceView/ChoiceView";
import SocialView  from "./SocialView/SocialView";
import KmAwayView from "./KmAwayView/KmAwayView";
import {questionmark0,cross0,check0} from "assets";


export default function ModelElector(props){
    const {parent,id=useId("modelelector"),model}=props;
    const modelelector=View({parent,id,className:css.modelelector}),state={
        more:false,
        moreEls:[],
    };

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

    modelelector.toggleMore=(shown=!state.more)=>{
        state.more=shown;
        const {moreEls}=state;
        const detailsEl=modelelector.querySelector(`.${css.details}`);
        const titleEl=modelelector.querySelector(`.${css.title}`);
        if(shown){
            titleEl.style.translate="0 -1.25em";
            detailsEl.style.translate="0 -5em";
            [
                KmAwayView({parent:detailsEl,kmaway:model.kmaway}),
                SocialView({parent:detailsEl}),
            ]
            .forEach(element=>{
                fadeIn(element,statics.fadeDuration);
                moreEls.push(element);
            });
        }
        else{
            while(moreEls.length){
                const element=moreEls.pop();
                fadeOut(element,statics.fadeDuration,()=>{element.remove()});
            }
            titleEl.style.translate=null;
            detailsEl.style.translate=null;
        }
    }

    return modelelector;
}

const statics={
    fadeDuration:500,
    choices:[
        {label:"nope",color:"#d979c3",icon:cross0},
        {label:"maybe",color:"#4599d7",icon:questionmark0},
        {label:"yes",color:"#208758",icon:check0},
    ],
}

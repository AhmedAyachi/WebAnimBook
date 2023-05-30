import {useId,View,map,fadeIn,groupBy} from "cherries";
import css from "./QuestionView.module.css";


export default function QuestionView(props){
    const {parent,id=useId("questionview"),question:{text,keyword}}=props;
    const questionview=View({parent,id,tag:"p",className:css.questionview}),state={
        keywords:keyword.split(" "),
    },{keywords}=state;

    questionview.innateHTML=`
        ${map(text.split(" "),(word)=>{
            const ptat=[".",",",";"].find(c=>word.endsWith(c));
            if(ptat){word=word.replace(ptat,"")}
            return `
                <span 
                    class="${css.word}" 
                    ${keywords.includes(word)?"key":""}
                >
                    ${map(word.split(""),(letter)=>`<span>${letter}</span>`)}
                </span>
                ${ptat||""}
            `
        })}
    `;

    const keywordEls=[...questionview.querySelectorAll(`.${css.word}[key]`)];
    groupBy(keywordEls,(keywordEl)=>keywordEl.offsetTop).forEach((line,i)=>{
        const {items}=line,{length}=items;
        items.forEach((keywordEl,j)=>{
            [j===0,(j+1)===length].forEach((bool,k)=>{
                if(bool){
                    const side=k?"Right":"Left";
                    Object.assign(keywordEl.style,{
                        [`borderTop${side}Radius`]:"0.15em",
                        [`borderBottom${side}Radius`]:"0.15em",
                    });
                }
            });
            fadeIn(keywordEl,statics.transDuration*2);
        });
    });
    const letterEls=questionview.querySelectorAll(`.${css.word}>span`);
    letterEls.forEach(letterEl=>{
        setTimeout(()=>{
            letterEl.style.transition=`ease-out ${statics.transDuration+Math.random()*statics.transDuration}ms`;
            letterEl.style.transform=`translateY(0)`;
        },0);
    });

    return questionview;
}

const statics={
    transDuration:300,
}

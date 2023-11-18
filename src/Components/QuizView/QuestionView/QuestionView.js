import {useId,DraggableView,map,fadeIn,groupBy} from "vritra";
import css from "./QuestionView.module.css";


export default function QuestionView(props){
    const {parent,id=useId("questionview"),question:{text,keyword}}=props;
    const questionview=DraggableView({
        parent,id,tag:"p",
        className:css.questionview,
        horizontalDrag:false,
        verticalDrag:false,
    }),state={
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
    keywordEls.forEach(keywordEl=>{
        fadeIn(keywordEl,statics.transDuration*2);
    });
    setTimeout(()=>{
        groupBy(keywordEls,(keywordEl)=>keywordEl.offsetTop).forEach(line=>{
            const {items}=line,{length}=items;
            items.forEach((keywordEl,i)=>{
                [i===0,(i+1)===length].forEach((bool,j)=>{
                    if(bool){
                        const side=j?"Right":"Left";
                        Object.assign(keywordEl.style,{
                            [`borderTop${side}Radius`]:"0.15em",
                            [`borderBottom${side}Radius`]:"0.15em",
                        });
                    }
                });
                
            });
        });
    },statics.transDuration/2);
    const letterEls=questionview.querySelectorAll(`.${css.word}>span`);
    letterEls.forEach(letterEl=>{
        setTimeout(()=>{
            const duration=statics.transDuration+Math.random()*statics.transDuration;
            Object.assign(letterEl.style,{
                transition:`ease-out ${duration}ms`,
                transform:`translateY(0)`,
            });
            setTimeout(()=>{letterEl.style.transition=null},duration);
        },0);
    });

    questionview.getKeywordEls=()=>keywordEls;

    return questionview;
}

const statics={
    transDuration:300,
}

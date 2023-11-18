import {useId,View,map, fadeIn, fadeOut} from "vritra";
import css from "./AnswerPad.module.css";
import {check0,cross0} from "assets";


export default function AnswerPad(props){
    const {parent,id=useId("answerpad"),onAnswer}=props;
    let answerpad=View({parent,id,className:css.answerpad});

    answerpad.innateHTML=`
        ${map(["Error","Valid"],(id,i)=>`
            <button id="${id}" class="${css.answerbtn}">
                <img src="${(i?check0:cross0)(textColor)}"/>
                <label>${id}</label>
            </button>
        `)}
    `;

    const answerbtns=answerpad.querySelectorAll(`.${css.answerbtn}`);
    answerbtns.forEach((answerbtn,i)=>{
        const {id}=answerbtn;
        answerbtn.onclick=()=>{
            const img=answerbtn.querySelector(":scope>img");
            img.src=(i?check0:cross0)(backgroundColor);
            answerbtn.setAttribute("clicked","");
            answerbtns.forEach(answerbtn=>{answerbtn.onclick=null});
            onAnswer&&onAnswer(id==="Valid");
        }
    });

    answerpad.reset=()=>{
        fadeOut(answerpad,150,()=>{
            answerpad=answerpad.substitute(fadeIn(AnswerPad(props),300));
        });
    }

    return answerpad;
}

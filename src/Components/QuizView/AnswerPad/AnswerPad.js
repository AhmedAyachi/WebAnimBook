import {useId,View,map} from "cherries";
import css from "./AnswerPad.module.css";
import {check0,cross0} from "assets";


export default function AnswerPad(props){
    const {parent,id=useId("answerpad")}=props;
    const answerpad=View({parent,id,className:css.answerpad});

    answerpad.innateHTML=`
        ${map(["Error","Valid"],(id,i)=>`
            <button id="${id}" class="${css.answerbtn}">
                <img src="${(i?check0:cross0)(textColor)}"/>
                <label>${id}</label>
            </button>
        `)}
    `;

    const answerbtns=answerpad.querySelectorAll(`.${css.button}`);
    answerbtns.forEach(answerbtn=>{
        answerbtn.onclick=props["on"+answerbtn.id];
    });

    return answerpad;
}

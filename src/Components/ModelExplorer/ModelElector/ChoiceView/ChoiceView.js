import {useId,View} from "cherries";
import css from "./ChoiceView.module.css";


export default function ChoiceView(props){
    const {parent,id=useId("choiceview"),choice}=props;
    const choiceview=View({parent,id,className:css.choiceview}),{color}=choice;

    choiceview.innateHTML=`
        <div class="${css.container}">
            <div class="${css.wrapper}" style="${styles.wrapper(color)}">
                <img class="${css.icon}" src="${choice.icon("white")}"/>
            </div>
        </div>
        <label class="${css.label}">${choice.label}</label>
    `;

    return choiceview;
}

const styles={
    wrapper:(color)=>`
        background-color:${color};
        filter:drop-shadow(0 0 3em ${color});
    `,
}

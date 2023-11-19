import {View,fadeIn} from "vritra";
import css from "./ScoreView.module.css";


export default function ScoreView(props){
    const {parent,score=0,outof=10}=props;
    const scoreview=View({parent,className:css.scoreview});

    scoreview.innateHTML=`
        <p class="${css.result}">
            <span 
                style="color:var(--${score>(outof/2)?"correct":"wrong"}Color)"
            >${score}</span>/<span class="${css.topscore}">${outof}</span>
        </p>
        <button ref="againbtn" class="${css.againbtn}">play again</button>
    `;

    scoreview.againbtn.onclick=()=>{
        parent.restart();
    }
    return fadeIn(scoreview);
}

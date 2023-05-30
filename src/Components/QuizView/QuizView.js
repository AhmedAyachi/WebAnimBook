import {useId,View,FlatList} from "cherries";
import css from "./QuizView.module.css";
import QuestionView from "./QuestionView/QuestionView";
import ChainView from "./ChainView/ChainView";
import AnswerPad from "./AnswerPad/AnswerPad";


export default function QuizView(props){
    const {parent,id=useId("quizview")}=props;
    const quizview=View({parent,id,className:css.quizview});

    quizview.innateHTML=`
        <div class="${css.footer}"></div>
    `;
    FlatList({
        parent:quizview,
        at:"start",
        className:css.questionlist,
        containerClassName:css.listcontainer,
        data:statics.questions,
        horizontal:true,pagingEnabled:true,
        scrollEnabled:false,
        renderItem:({parent,item})=>QuestionView({parent,question:item}),
    });
    const footerEl=quizview.querySelector(`.${css.footer}`);
    ChainView({
        parent:footerEl,
        length:statics.questions.length,
    });
    AnswerPad({
        parent:footerEl,
    });

    return quizview;
}

const statics={
    questions:[
        {
            text:"deciding it was better late than never, Julia Child enrolled in culinary school at age 37",
            keyword:"better late than never",
            valid:true,
        },
        {
            text:"don't take healthy teeth for granted; floss once a day to help prevent gum disease",
            keyword:"for granted",
            valid:true,
        },
        {
            text:"my boss is coldhearted; he expects me to come to work even when i'm sick",
            keyword:"coldhearted",
            valid:true,
        },
        {
            text:"after getting promoted, Victor was often on his hind horse, bossing people around",
            keyword:"hind horse",
            valid:false,
        },
        {
            text:"Muhammed Ali dusked off his gloves in 1970, returning to boxing after a 3-year ban",
            keyword:"dusked off",
            valid:false,
        },
        {
            text:"the entrepreneur believed eliminating red ape would help his business grow",
            keyword:"red ape",
            valid:false,
        },
        {
            text:"a whole other theory suggests Vincent van Gogh's death was a murder and not a suicide",
            keyword:"A whole other",
            valid:true,
        },
        {
            text:"common cents tells us that we should dress warmly when it's cold outside",
            keyword:"common cents",
            valid:false,
        },
        {
            text:"Adrian decided to stop being such a sticking the mud and had fun on the dance floor",
            keyword:"sticking the mud",
            valid:false,
        },
    ],
}

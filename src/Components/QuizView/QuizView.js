import {View,FlatList,withSequence,randomItem,removeItem, fadeOut, fadeIn} from "vritra";
import css from "./QuizView.module.css";
import QuestionView from "./QuestionView/QuestionView";
import ChainView from "./ChainView/ChainView";
import AnswerPad from "./AnswerPad/AnswerPad";
import ScoreView from "./ScoreView/ScoreView";


export default function QuizView(props){
    const {parent}=props;
    let quizview=View({parent,className:css.quizview});const state={
        index:0,
        questions:randomQuestions(10),
        questionviews:[],
        score:0,
    },{questions}=state;

    quizview.innateHTML=`
        <p class="${css.question}">is the highlighted expression correct ?</p>
        <div ref="footerEl" class="${css.footer}"></div>
    `;
    const {footerEl}=quizview;
    const flatlist=FlatList({
        parent:quizview,
        className:css.flatlist,
        containerClassName:css.container,
        horizontal:true,
        pagingEnabled:true,
        scrollEnabled:false,
        data:questions,//[questions[0]],
        renderItem:({parent,item})=>{
            const questionview=QuestionView({parent,question:item});
            state.questionviews.push(questionview);
            return questionview;
        },
    }).adjacentTo(footerEl,true);

    const chainview=ChainView({
        parent:footerEl,
        length:questions.length,
    });
    const answerpad=AnswerPad({
        parent:footerEl,
        onAnswer:(valid)=>{
            const {index}=state;
            const questionview=state.questionviews[index];
            const question=questions[index];
            const correct=valid===question.valid;
            if(correct){state.score++};
            validateQuestionView(questionview,correct,()=>{
                chainview.updateNodeAtIndex(index,correct);
                state.index++;
                //flatlist.addItems([questions[state.index]]);
                flatlist.scrollToIndex(state.index);
                if(index<(questions.length-1)){
                    answerpad.reset();
                }
                else{
                    setTimeout(()=>{
                        ScoreView({
                            parent:quizview,
                            score:state.score,
                            outof:questions.length,
                        });
                    },350);
                }
            });
        }
    });


    quizview.restart=()=>{
        fadeOut(quizview,()=>{
            quizview=quizview.substitute(fadeIn(QuizView(props)));
        });
    }

    return quizview;
}

const statics={
    questions:[
        {
            text:"in other words, she is a great fit for the job",
            keyword:"in",
            valid:true, 
        },
        {
            text:"ancient Rome's Colosseum was capable to holding at least 50,000 spectators",
            keyword:"to",
            valid:false,
        },
        {
            text:"Steffi Graf is in the Hall of Fame because she was a great tennis player",
            keyword:"great",
            valid:true,
        },
        {
            text:"alex asked Jadan where she wanted to go for dinner",
            keyword:"where",
            valid:true,
        },
        {
            text:"he told me to bring either lunch nor money for the cafe",
            keyword:"nor",
            valid:false,
        },
        {
            text:"chance was grateful for the homework help his sister gave him",
            keyword:"grateful",
            valid:true,
        },
        {
            text:"apples are better than oranges",
            keyword:"better",
            valid:true,
        },
        {
            text:"he slow swarm across the pool",
            keyword:"slow",
            valid:false,
        },
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

const randomQuestions=(count=5)=>{
    const questions=[...statics.questions];
    while(questions.length>count){
        removeItem(questions,randomItem(questions));
    }
    return questions;
};

const validateQuestionView=(questionview,correct,callback)=>{
    withSequence(questionview,[0.95,1.05,1].map((scale,i)=>({
        toStyle:{
            transform:`scale(${scale})`,
            opacity:i?1:0,
            overflow:"hidden",
        },
        easing:i?"ease":"linear",
        duration:150,
    })),callback);
    const keywordEls=questionview.getKeywordEls();
    keywordEls.forEach(keywordEl=>{
        withSequence(keywordEl,[
            {
                toStyle:{
                    backgroundColor:correct?"var(--correctColor)":"var(--wrongColor)",
                    color:"var(--textColor)"
                },
                duration:150,
            },
        ]);
    });
}

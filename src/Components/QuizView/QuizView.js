import {fadeOut, useId,View,withSequence} from "vritra";
import css from "./QuizView.module.css";
import QuestionView from "./QuestionView/QuestionView";
import ChainView from "./ChainView/ChainView";
import AnswerPad from "./AnswerPad/AnswerPad";


export default function QuizView(props){
    const {parent,id=useId("quizview")}=props;
    const quizview=View({parent,id,className:css.quizview}),state={
        index:0,
        questionview:null,
    };

    quizview.innateHTML=`
        <div class="${css.container}"></div>
        <div class="${css.footer}"></div>
    `;
    
    const footerEl=quizview.querySelector(`.${css.footer}`);
    const chainview=ChainView({
        parent:footerEl,
        length:statics.questions.length,
    });
    AnswerPad({
        parent:footerEl,
        onAnswer:(valid)=>{
            const {questionview,index}=state;
            const question=statics.questions[state.index];
            if(valid===question.valid){
                validateQuestionView(questionview,chainview,index);
            }
        }
    });

    quizview.loadQuestion=()=>{
        const {questionview}=state;
        questionview&&questionview.remove();
        state.questionview=QuestionView({
            parent:quizview.querySelector(`.${css.container}`),
            question:statics.questions[state.index],
        });
    }
    quizview.loadQuestion();

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

const validateQuestionView=(questionview,chainview,index)=>{
    const {offsetWidth,offsetHeight}=questionview;
    const ratio=offsetWidth/offsetHeight;//scaleX*offsetWidth=scaleY*offsetHeight
    const scaleX=0.4,scaleY=scaleX*ratio;
    withSequence(questionview,[
        ...[0.95,1.05,1].map((scale,i)=>({
            toStyle:{transform:`scale(${scale})`,opacity:i?1:0,overflow:"hidden"},
            easing:i?"ease":"linear",
            duration:100,
        })),
        /* {
            toStyle:{
                transform:`scale(${scaleX},${scaleY}) rotateZ(-360deg)`,
                borderRadius:"50%",
            },
            delay:100,duration:1000,
        }, */
    ],()=>{
        setTimeout(()=>{
            const duration=1000;
            const transition=`linear ${duration}ms`;
            Object.assign(questionview.style,{
                transform:`scale(${scaleX},${scaleY})`,// rotateZ(-360deg)
                borderRadius:"50%",
                transition,
            });
            const letterEls=questionview.getLetterEls();
            letterEls.forEach((letterEl,i)=>{
                Object.assign(letterEl.style,{
                    transform:`translate(${100*(0.5-Math.random())}%,${100*(0.5-Math.random())}%)`,
                    //opacity:Math.random()>0.5?0:1,
                    //transition,
                });
            });
            /* setTimeout(()=>{
                Object.assign(questionview.style,{
                    animation:`${css.rotate} infinite ${duration}ms linear normal forwards`,
                }); 
            },duration); */
        },200);
        
        keywordEls.forEach(keywordEl=>{
            keywordEl.style.color=textColor;
            keywordEl.style.backgroundColor="transparent";
        });
        /* const node=chainview.getNodeAtIndex(index);
        const {x,y}=node.getBoundingClientRect();
        const {left,top}=questionview.getBoundingClientRect();
        const moveduration=1000;
        questionview.setPosition({
            x:x-left,
            y:y-top,
            duration:moveduration,
            easing:"ease-out",
        }); */
        /* questionview.style.background="var(--majorColor)"; */

    });
    const keywordEls=questionview.getKeywordEls();
    keywordEls.forEach(keywordEl=>{
        keywordEl.style.backgroundColor="var(--majorColor)";
    });
}

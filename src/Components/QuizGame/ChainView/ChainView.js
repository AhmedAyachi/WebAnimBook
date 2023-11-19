import {useId,View,map} from "vritra";
import css from "./ChainView.module.css";


export default function ChainView(props){
    const {parent,id=useId("chainview"),length}=props;
    const chainview=View({parent,id,className:css.chainview});

    chainview.innateHTML=`
        ${map(length,()=>`<div class="${css.node}"></div>`)}
        <div class="${css.branch}"></div>
    `;

    chainview.updateNodeAtIndex=(index,correct)=>{
        const node=chainview.querySelector(`.${css.node}:nth-of-type(${index+1})`);
        if(node){
            node.style.backgroundColor=correct?"var(--correctColor)":"var(--wrongColor)";
        }
    }

    return chainview;
}

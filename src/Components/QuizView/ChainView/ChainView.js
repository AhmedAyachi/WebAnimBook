import {useId,View,map} from "vritra";
import css from "./ChainView.module.css";


export default function ChainView(props){
    const {parent,id=useId("chainview"),length}=props;
    const chainview=View({parent,id,className:css.chainview});

    chainview.innateHTML=`
        ${map(length,()=>`<div class="${css.node}"></div>`)}
        <div class="${css.branch}"></div>
    `;

    chainview.getNodeAtIndex=(i)=>chainview.querySelector(`.${css.node}:nth-of-type(${i+1})`);

    return chainview;
}

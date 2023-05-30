import {useId,View,map} from "cherries";
import css from "./ChainView.module.css";


export default function ChainView(props){
    const {parent,id=useId("chainview"),length}=props;
    const chainview=View({parent,id,className:css.chainview});

    chainview.innateHTML=`
        ${map(length,()=>`<div class="${css.node}"></div>`)}
        <div class="${css.branch}"></div>
    `;

    return chainview;
}

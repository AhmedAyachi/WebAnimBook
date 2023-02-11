import {useId,View} from "cherries";
import css from "./KmAwayView.module.css";
import {paperplane0} from "assets";


export default function KmAwayView(props){
    const {parent,id=useId("kmawayview"),kmaway}=props;
    const kmawayview=View({parent,id,className:css.kmawayview});

    kmawayview.innateHTML=`
        <img class="${css.icon}" src="${paperplane0("white")}"/>
        <h3 class="${css.text}">${kmaway} km away</h3>
    `;

    return kmawayview;
}

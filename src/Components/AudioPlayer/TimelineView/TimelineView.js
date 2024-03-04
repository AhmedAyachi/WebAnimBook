import {View,map} from "vritra";
import css from "./TimelineView.module.css";
import {add0} from "assets";


export default function TimelineView(props){
    const {parent,song}=props;
    const timelineview=View({parent,className:css.timelineview});

    timelineview.innateHTML=`
        <div class="${css.info}">
            <text as="h3" class="${css.name}">${song.name}</text>
            <text class="${css.artists}">
                ${map(song.artists,({name},i)=>`${i?", ":""}${name}`)}
            </text>
        </div>
        <img ref="addbtn" class="button ${css.addbtn}" src="${add0("white")}"/>
    `;

    return timelineview;
}

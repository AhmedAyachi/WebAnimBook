import {View} from "vritra";
import css from "./PosterView.module.css";


export default function PosterView(props){
    const {parent,poster}=props;
    const posterview=View({parent,className:css.posterview});

    posterview.innateHTML=`
        <img class="${css.poster}" src="${poster}"/>
    `;

    return posterview;
}

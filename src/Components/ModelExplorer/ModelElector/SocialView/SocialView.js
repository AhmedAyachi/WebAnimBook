import {useId,View,map} from "cherries";
import css from "./SocialView.module.css";
import {facebook0,snapchat0,instagram0} from "assets";


export default function SocialView(props){
    const {parent,id=useId("socialview")}=props;
    const socialview=View({parent,id,className:css.socialview});

    socialview.innateHTML=`
        ${map(statics.icons,({id,src})=>`<img id="${id}" class="${css.icon}" src="${src("white")}"/>`)}
    `;

    return socialview;
}

const statics=SocialView.statics={
    icons:[
        {id:"facebook",src:facebook0},
        {id:"snapchat",src:snapchat0},
        {id:"instagram",src:instagram0}
    ]
}

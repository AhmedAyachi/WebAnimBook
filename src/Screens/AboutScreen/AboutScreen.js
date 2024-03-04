import {map} from "vritra";
import ScreenView from "../ScreenView/ScreenView";
import css from "./AboutScreen.module.css";
import {linkedin0,mail0,appicon} from "assets";


export default function AboutScreen(props){
    const {parent}=props;
    const aboutscreen=ScreenView({parent,className:css.aboutscreen});

    aboutscreen.beforeEndHTML=`
        <div class="${css.overview}">
            <img class="${css.appicon}" src="${appicon(textColor)}"/>
            <h3 class="${css.title}">
                <span>WebAnimBook</span> 
            </h3>
        </div>
        <div class="${css.about}">
            <h3 class="${css.title}">about author</h3>
            <div class="${css.fields}">
                ${map(statics.fields,({id,icon,value})=>`
                    <div id="${id}" class="${css.field}">
                        <img title="" src="${icon("white")}"/>
                        <span class="${css.value}">${value||""}</span>
                    </div>
                `)}
            </div>
        </div>
    `;

    return aboutscreen;
}

const statics={
    fields:[
        {
            id:"mail",icon:mail0,
            value:"aayachi032@gmail.com",
        },
        {
            id:"linkedin",icon:linkedin0,
            value:"www.linkedin.com/in/ahmed-ayachi",
        }
    ],
}

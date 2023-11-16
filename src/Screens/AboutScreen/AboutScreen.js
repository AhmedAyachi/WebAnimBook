import {useId,map} from "vritra";
import ScreenView from "../ScreenView/ScreenView";
import css from "./AboutScreen.module.css";
import {cordova,svgrepo,tabler,phone0,linkedin0,mail0,appicon} from "assets";


export default function AboutScreen(props){
    const {parent,id=useId("aboutscreen")}=props;
    const aboutscreen=ScreenView({parent,id,className:css.aboutscreen});

    aboutscreen.beforeEndHTML=`
        <div class="${css.row0}">
            <img class="${css.appicon}" src="${appicon}"/>
            <h3 class="${css.title}">WebAnimBook</h3>
            <h3 class="${css.version}">1.0.0</h3>
            <div class="${css.section}">
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
        </div>
        <div class="${css.row1}">
            ${map([tabler,cordova,svgrepo],(icon,i)=>`
                <img class="${css.logo}" src="${icon}" ${i===1?`style="width:15em"`:""} />
            `)}
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
        },
        {
            id:"phone",icon:phone0,
            value:"+216 56152037",
        },
    ],
}

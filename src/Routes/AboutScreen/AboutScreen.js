import {useId} from "cherries";
import ScreenView from "../ScreenView/ScreenView";
import css from "./AboutScreen.module.css";


export default function AboutScreen(props){
    const {parent,id=useId("aboutscreen")}=props;
    const aboutscreen=ScreenView({parent,id,className:css.aboutscreen});

    aboutscreen.beforeEndHTML=`
    `;

    return aboutscreen;
}

import {useId} from "cherries";
import ScreenView from "../ScreenView/ScreenView";
import css from "./HomeScreen.module.css";


export default function HomeScreen(props){
    const {parent,id=useId("homescreen")}=props;
    const homescreen=ScreenView({parent,id,className:css.homescreen});

    homescreen.beforeEndHTML=`
    `;

    return homescreen;
}

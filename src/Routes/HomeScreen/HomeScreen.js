import {useId} from "cherries";
import ScreenView from "../ScreenView/ScreenView";
import css from "./HomeScreen.module.css";
import {ModelExplorer} from "components";


export default function HomeScreen(props){
    const {parent,id=useId("homescreen")}=props;
    const homescreen=ScreenView({parent,id,className:css.homescreen});

    homescreen.beforeEndHTML=`
    `;
    ModelExplorer({parent:homescreen});

    return homescreen;
}

import {useId} from "cherries";
import ScreenView from "../ScreenView/ScreenView";
import css from "./HomeScreen.module.css";
import {} from "components";


export default function HomeScreen(props){
    const {parent,id=useId("homescreen")}=props;
    const homescreen=ScreenView({parent,id,className:css.homescreen});

    homescreen.beforeEndHTML=`
        <div class="${css.row0}">
            <p class="${css.message}">
                This is an animation book for web.
                Use the drawer navigator above to navigate between animations
            </p>
        </div>
        <div class="${css.row1}">
            <p><span class="${css.name}">Ahmed Ayachi</span></p>
        </div>
    `;

    return homescreen;
}

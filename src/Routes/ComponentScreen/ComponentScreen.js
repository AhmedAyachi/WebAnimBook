import {useId} from "cherries";
import ScreenView from "../ScreenView/ScreenView";
import css from "./ComponentScreen.module.css";


export default function ComponentScreen(props){
    const {parent,id=useId("componentscreen"),name,component}=props;
    const componentscreen=ScreenView({parent,id,className:css.componentscreen});

    componentscreen.beforeEndHTML=`
    `;

    component&&component({
        parent:componentscreen,
        className:css[name],
    });

    return componentscreen;
}

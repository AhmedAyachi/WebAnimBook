import {View,DrawerNavigator} from "cherries";
import css from "./MainView.module.css";
import {ComponentScreen,AboutScreen,HomeScreen} from "routes";
import * as components from "components";


export default function MainView(props){
    const {parent}=props;
    const mainview=View({parent,id:"webview",className:css.mainview});

    mainview.innateHTML=`
    `;

    DrawerNavigator({
        parent:mainview,
        className:css.navigator,
        routes:[
            {id:"home",component:HomeScreen},
            ...Object.keys(components).map(key=>({
                id:key,
                component:({parent})=>ComponentScreen({
                    parent,name:key.toLowerCase(),
                    component:components[key],
                }),
            })),
            {id:"about",component:AboutScreen},
        ],
    });
    
    return mainview;
}
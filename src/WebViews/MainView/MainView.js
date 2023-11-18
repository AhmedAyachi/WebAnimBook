import {View,DrawerNavigator} from "vritra";
import css from "./MainView.module.css";
import {ComponentScreen,AboutScreen,HomeScreen} from "screens";
import * as components from "components";


export default function MainView(props){
    const {parent}=props;
    const mainview=View({parent,id:"webview",className:css.mainview});

    mainview.innateHTML=`
    `;
    DrawerNavigator({
        parent:mainview,
        headerClassName:css.header,
        containerClassName:css.container,
        tintColor:majorColor,
        initialId:"QuizView",
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

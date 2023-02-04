import "../index";
import MainView from "./MainView";
import {makeStatusBarTranslucent} from "resources";
import {store} from "../../Store";


function onDeviceReady(){
    makeStatusBarTranslucent();
    WebView.initiateStore(store,()=>{
        MainView({
            parent:document.body,
        });
    });
};

document.addEventListener("deviceready",onDeviceReady,false);
document.addEventListener("backbutton",()=>{
    location.hash?history.back():window.plugins.appMinimize.minimize();
},false);
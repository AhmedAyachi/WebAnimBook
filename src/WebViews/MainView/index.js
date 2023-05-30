import "../index";
import MainView from "./MainView";
import {makeStatusBarUnderlaid} from "resources";
//import WebViews from "../WebViews";
import {store} from "../../Store";


function onDeviceReady(){
    makeStatusBarUnderlaid();
    //WebView.defineWebViews(WebViews);
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
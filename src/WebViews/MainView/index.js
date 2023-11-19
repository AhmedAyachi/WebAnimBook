import "../index";
import MainView from "./MainView";
import {store} from "../../Store";
import WebViews from "../WebViews";


function onDeviceReady(){
    if(cordova.platformId==="ios"){
        StatusBar.backgroundColorByHexString(textColor);
        StatusBar.styleDefault();
    }
    WebView.defineWebViews(WebViews);
    WebView.initiateStore(store,(store)=>{
        MainView({parent:document.body,store});
    });
};

document.addEventListener("deviceready",onDeviceReady,false);
document.addEventListener("backbutton",()=>{
    location.hash?history.back():WebView.close();
},false);
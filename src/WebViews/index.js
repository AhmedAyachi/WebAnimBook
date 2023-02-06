import "./index.css";
import {language as langdata} from "resources";


function onDeviceReady(){
    WebView.useStore(store=>{
        const langname=store.langname||"english";
        const language=langdata[langname];
        language.$name=langname;
        window.language=Object.freeze(language);
    });
    
    if(cordova.platformId==="ios"){
        window.addEventListener("touchstart",()=>{
            const {activeElement}=document;
            if((activeElement===document.body)){
                Keyboard&&Keyboard.isVisible&&Keyboard.hide();
                activeElement.click();
            }
        });
    }
};

document.addEventListener("deviceready",onDeviceReady,false);

!function setCssVars(){
    const style=getComputedStyle(document.documentElement);
    Object.defineProperty(window,"rem",{
        value:parseFloat(style.getPropertyValue("font-size")),
    });
    ["mainFont","minorFont","mainColor","minorColor","backgroundColor"].forEach(name=>{
        Object.defineProperty(window,name,{
            value:style.getPropertyValue(`--${name}`),
        });
    });
}();

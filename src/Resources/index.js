

export {default as language} from "./Language.json";

export const makeStatusBarTranslucent=(styleId)=>{
    if(cordova.platformId!=="browser"){
        StatusBar.show();
        StatusBar.overlaysWebView(true);
        StatusBar.backgroundColorByHexString("#00000000");
        StatusBar[styleId?"styleLightContent":"styleDefault"]();
    }
}

export const makeStatusBarUnderlaid=(color,styleId)=>{
    if(cordova.platformId!=="browser"){
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString(color||backgroundColor);
        StatusBar[styleId?"styleLightContent":"styleDefault"]();
        StatusBar.show();
    }
}

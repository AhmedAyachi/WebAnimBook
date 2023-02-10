

export {default as language} from "./Language.json";

export const makeStatusBarTranslucent=(styleId)=>{
    if(cordova.platformId!=="browser"){
        StatusBar.show();
        StatusBar.overlaysWebView(true);
        StatusBar.backgroundColorByHexString("#00000000");
        StatusBar[styleId?"styleLightContent":"styleDefault"]();
    }
}

export const makeStatusBarUnderlaid=(color="white",styleId)=>{
    if(cordova.platformId!=="browser"){
        StatusBar.overlaysWebView(false);
        StatusBar[color.startsWith("#")?"backgroundColorByHexString":"backgroundColorByName"](color);
        StatusBar[styleId?"styleLightContent":"styleDefault"]();
        StatusBar.show();
    }
}

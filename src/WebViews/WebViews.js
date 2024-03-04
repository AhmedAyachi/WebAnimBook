

module.exports=[
    //{name:"SecondView"},
].map((webview,i)=>({
    ...webview,
    id:webview.name.toLowerCase(),
    backgroundColor:cordova.platformId==="android"?globalThis.backgroundColor:"red",
    file:`index${i+1}.html`,
}));

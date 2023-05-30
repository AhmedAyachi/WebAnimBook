

module.exports=[
    //{name:"SecondView"},
].map((webview,i)=>({
    ...webview,
    id:webview.name.toLowerCase(),
    backgroundColor:globalThis.backgroundColor,
    file:`index${i+1}.html`,
}));

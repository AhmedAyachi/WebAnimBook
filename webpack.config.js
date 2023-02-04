
const path=require("path");
const webpack=require("webpack");
const TerserPlugin=require("terser-webpack-plugin");

const options={
    mode:"development",
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    "style-loader",
                    {
                        loader:"css-loader",
                        options:{
                            modules:{
                                mode:"local",
                                auto:true,
                                localIdentName:"[local]_[hash]",
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg|mp4)$/i,
                use:"url-loader",
            },
        ]
    },
    plugins:[
        new webpack.ProvidePlugin({
            Buffer:["buffer","Buffer"],
        }),
    ],
    optimization:{
        minimize:true,
        minimizer:[new TerserPlugin({
            parallel:true,
            extractComments:false,
        })],
    },
    watchOptions:{
        aggregateTimeout:0,
        poll:true,
        ignored:["node_modules/**"],
    },
    resolve:{
        alias:{
            "assets":path.resolve(__dirname,"src/Assets/index.js"),
            "routes":path.resolve(__dirname,"src/Routes/index.js"),
            "actions":path.resolve(__dirname,"src/Store/Actions/index.js"),
            "resources":path.resolve(__dirname,"src/Resources/index.js"),
            "components":path.resolve(__dirname,"src/Components/index.js"),
        },
    },
}
module.exports=["MainView"].map(webview=>({
    ...options,
    entry:`./src/WebViews/${webview}/index.js`,
    output:{
        filename:`${webview}.js`,
        path:path.resolve(__dirname,"www"),
    },
}));
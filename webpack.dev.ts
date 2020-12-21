import * as webpack from "webpack";
import merge from "webpack-merge";
import common from './webpack.common';

const config: webpack.Configuration = merge(common, {
    mode: "development",
    devtool: "eval-cheap-source-map",
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

})

export default config

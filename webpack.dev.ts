import * as webpack from "webpack";
import {Configuration} from "webpack";
import merge from "webpack-merge";
import common from './webpack.common';

const config = merge(common, {
    mode: "development",
    devtool: "eval-cheap-source-map",
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]

} as Configuration);

export default config;

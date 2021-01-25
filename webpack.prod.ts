import * as webpack from "webpack";
import merge from "webpack-merge";
import common from './webpack.common';
import {LicenseWebpackPlugin} from "license-webpack-plugin";
// @ts-ignore
import PrerenderSPAPlugin from 'prerender-spa-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import {CleanWebpackPlugin} from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import * as path from 'path';

const PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer;

const plugins = [
    // new SriPlugin({
    // hashFuncNames: ["sha256"],
    // enabled: true
    // }),
    new LicenseWebpackPlugin({
        // perChunkOutput: false
        licenseTextOverrides: {
            blurhash: 'MIT'
        }
    }) as any,
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({patterns: [{from: "icon", to: "icon"}]}),
    // new CopyWebpackPlugin({patterns: [{from: "licenses.txt", to: "licenses.txt"}]}),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    }),
    new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css"
    }),
    new CompressionPlugin({
        test: /\.(js|css|html)/
    }),
];

if (process.env.PRERENDER !== 'disabled') {
    plugins.push(new PrerenderSPAPlugin({
            staticDir: path.join(__dirname, 'dist'), // The path to the folder where index.html is.
            routes: require("./routes"), // List of routes to prerender.
            renderer: new PuppeteerRenderer({
                headless: true,
                inject: {
                    prerender: true
                },
                maxConcurrentRoutes: 4,
            }),
        })
    );
}


const config: webpack.Configuration = merge(common, {
    mode: "production",
    optimization: {
        splitChunks: {
            name: "commons"
        },
        minimize: true,
        moduleIds: "deterministic"
    },
    devtool: "source-map",
    plugins: plugins
});


export default config;

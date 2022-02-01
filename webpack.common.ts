import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {VueLoaderPlugin} from "vue-loader";
import {default as ESLintPlugin} from "eslint-webpack-plugin";

const commitHash = require('child_process').execSync('git rev-parse --short HEAD').toString();

const production = process.env.NODE_ENV === "production";

const config: webpack.Configuration = {
    entry: "./src/main.ts",
    output: {
        publicPath: '/',
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        crossOriginLoading: "anonymous",
        assetModuleFilename:'[folder]/[name].[ext]?hash=[contenthash]'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "my-index.ejs",
        }),
        new ESLintPlugin(),
        // new webpack.IgnorePlugin(/^jquery/),
        new webpack.DefinePlugin({
            "process.env": {
                API_KEY: '"' + process.env.API_KEY + '"'
            },
            "COMMITHASH": commitHash

        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|en/),
        new VueLoaderPlugin() as any,

    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    sourceMap: true,
                    cssSourceMap: true,
                    transformToRequire: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    },
                }
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                    transpileOnly: true
                }
            },
            {
                test: /\.js$/,
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                ),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "targets": {
                                        "browsers": [
                                            ">1% in AT"
                                        ]
                                    }
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    !production
                        ? "vue-style-loader"
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require("autoprefixer")()]
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    !production
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            esModule: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [require('autoprefixer')()]
                            }
                        }
                    },
                ]
            },
            {
                test: /\.yaml$/,
                loader: path.resolve('data-loader.js'),
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: path.resolve('image-loader.js')
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[folder]/[name].[ext]?hash=[contenthash]'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            svgo: {
                                enabled: false
                            }
                        },
                    },
                ],
            },
        ]
    }
};

export default config;

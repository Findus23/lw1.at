let path = require('path');
let webpack = require('webpack');
let {CleanWebpackPlugin} = require('clean-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let SriPlugin = require('webpack-subresource-integrity');
let CompressionPlugin = require('compression-webpack-plugin');
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let VueLoaderPlugin = require('vue-loader/lib/plugin');
let PrerenderSPAPlugin = require('prerender-spa-plugin');
let PuppeteerRenderer = PrerenderSPAPlugin.PuppeteerRenderer;
let LicenseWebpackPlugin = require('license-webpack-plugin').LicenseWebpackPlugin;

const commitHash = require('child_process').execSync('git rev-parse --short HEAD').toString();

module.exports = {
    entry: {app: './src/main.js'},
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/',
        filename: '[name]-build-[hash].js',
        crossOriginLoading: "anonymous"
    },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    sourceMap: true,
                    extractCSS: process.env.NODE_ENV === 'production',
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
                test: /\.(asc)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[folder]/[name].[ext]?hash=[contenthash]'
                        }
                    }
                ]
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
            {
                test: /\.yaml$/,
                loader: path.resolve('data-loader.js'),
            },
            {
                test: /\.scss$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [require('autoprefixer')()]
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV !== 'production'
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {importLoaders: 1}
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: [require('autoprefixer')()]
                        }
                    },
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'My App',
            template: 'my-index.ejs',
            devServer: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8081',
        }),
        new webpack.NamedModulesPlugin(),
        new SriPlugin({
            hashFuncNames: ['sha256'],
            enabled: process.env.NODE_ENV === 'production',
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|en/),

        new VueLoaderPlugin(),
        new LicenseWebpackPlugin({
            perChunkOutput: false,
            outputFilename: "licenses.txt"
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    module.exports.optimization = {
        splitChunks: {
            chunks: 'all',
            name: "commons"
        },
        minimize: true
    };
    module.exports.devtool = '#source-map';
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
            "COMMITHASH": commitHash
        }),
        new MiniCssExtractPlugin({
            filename: "[name]-[hash].css",
            chunkFilename: "[name]-[hash].css"
        }),
        new CompressionPlugin({
            test: /\.(js|css|html)/
        }),
        // new SriPlugin({
        //     hashFuncNames: ['sha256'],
        // }),
    ]);
    if (process.env.PRERENDER !== 'disabled') {
        module.exports.plugins = (module.exports.plugins || []).concat([
            new PrerenderSPAPlugin({
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
        ]);
    }
}

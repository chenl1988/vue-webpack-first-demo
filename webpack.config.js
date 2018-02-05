const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const isDev = process.env.NODE_ENV === "development"; /* windows */

const config = {
    target: "web",
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist")
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [{
                    /* 图片转base64 */
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        /* [name]:原文件名 ; [ext]:扩展名*/
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        /* 在webpack编译过程中以及写代码时 判断环境；开发还是生产 */
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

/* 判断是开发还是正式环境 */
/* cross-env: 不同平台执行脚本  */
if (isDev) {
    /* devTool 帮助在页面上调试代码 sourceMap映射 */
    config.devtool = "#cheap-module-eval-source-map";
    /* webpack2加入的devServer配置 */
    config.devServer = {
        port: 8000,
        /* 可以通过ip访问 */
        host: "0.0.0.0",
        /* 在webpack编译的过程中出现错误显示在网页上面 */
        overlay: {
            errors: true,
        },
        /* 单面应用 前端路由 
        histroyFallback: {

        },*/
        /* 只刷新修改的组件，而不是整个页面  */
        hot: true
            /* 自动打开浏览器 */
            /* open: true */
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        /* 减少不需要的信息展示 */
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config;
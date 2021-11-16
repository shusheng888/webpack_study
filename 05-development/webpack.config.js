const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports={
    //入口文件
    entry: './src/index.js',
    //出口
    output: {
        //文件名
        filename: "bundle.js",
        //必须为绝对路径
        path: path.resolve(__dirname,'./dist'),
        //每次打包之前，清除dist文件夹
        clean: true
    },
    //模式，有production、development和none三种
    mode: "development",
    plugins: [
        //通过new的方式实例化HtmlWebpackPlugin
        new HtmlWebpackPlugin({
            //打包生成的文件模板
            template: "./index.html",
            //打包生成的文件名称，默认为index.html
            filename: "app.html",
            //注入到html模版的什么位置，有值true、false、'head'、'body'
            inject: 'body'
        })
    ],
    devServer: {
      static:'./dist'
    },
    devtool: 'inline-source-map',
}
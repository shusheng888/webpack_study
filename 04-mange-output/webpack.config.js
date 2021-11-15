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
        path: path.resolve(__dirname,'./dist')
    },
    //模式，有production、environment和none三种
    mode: "none",
    plugins: [
        //通过new的方式实例化HtmlWebpackPlugin
        new HtmlWebpackPlugin()
    ]
}
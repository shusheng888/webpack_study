const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const svgToMiniDataURI = require('mini-svg-data-uri');
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
        clean: true,
        assetModuleFilename: "images/[contenthash][ext][query]"
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
    //devServer.static属性配置打包文件路径
    devServer: {
      static:'./dist'
    },
    //source-map进行源代码映射，方便开发环境快速定位出错点
    devtool: 'inline-source-map',
    //配置资源文件，四种类型
    module: {
        //创建模块时，匹配请求的规则数组
        rules: [
            {
                //使用正则匹配后缀名为.png的文件
                test: /\.png$/,
                //第一种资源类型
                type: "asset/resource",//以URI的形式访问
                //优先级高于 assetModuleFilename
                generator: {
                  filename: 'images/[contenthash][ext][query]'
                }
            },
            {
                //使用正则匹配后缀为.svg的文件
                test: /\.svg$/,
                //第二种资源类型
                type: "asset/inline",//以base64编码的形式进行访问
                generator: {
                    dataUrl: (content) => {
                        if (typeof content !== 'string') {
                            content = content.toString();
                        }
                        return svgToMiniDataURI(content);
                    }
                }
            },
            {
                //使用正则匹配后缀为.json的源代码文件
                test: /\.json$/,
                //第三种资源类型
                type: "asset/source",//源代码

            },
            {
                //使用正则匹配后缀为.jpeg的文件
                test: /\.jpeg$/,
                //第四种资源类型
                type: "asset",//介于inline与resource之间选择，可自定义
                parser: {
                    dataUrlCondition:{
                        //默认大于8kb是inline形式，小于是resource形式
                        maxSize: 4*1024
                    }
                }
            },
            {
                //使用正则匹配后缀为.css的文件
                test: /\.css$/,
                use: ['style-loader','css-loader']
            }
        ]
    }
}
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");
const svgToMiniDataURI = require('mini-svg-data-uri');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

module.exports={
    //入口文件
    // entry:{
    //     index: {
    //         import: './src/index.js',
    //         dependOn: 'shared',
    //     },
    //     another:{
    //         import: './src/another-moudle.js',
    //         dependOn: 'shared',
    //     },
    //     shared:'loadsh',
    // },
    entry:{
        index:'./src/index.js',
        another:'./src/another-moudle.js',
    },
    //出口
    output: {
        //文件名
        filename: "script/[name].[contenthash].js",
        //必须为绝对路径
        path: path.resolve(__dirname,'./dist'),
        //每次打包之前，清除dist文件夹
        clean: true,
        assetModuleFilename: "images/[contenthash][ext][query]"
    },
    //模式，有production、development、none三种
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
        }),
        new MiniCssExtractPlugin({
            //filename不传默认是main.css
            filename:'styles/[contenthash].css'
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
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader'],
            },
            {
                //使用正则匹配后缀为.less的文件
                test: /\.less$/i,//针对less样式，先用less-loader解析，再用css-loader和style-loader通用解析，逆序解析
                use: ['style-loader','css-loader','less-loader'],
            },
            {
                //加载字体
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource"
            },
            //加载表格
            {
                test: /\.(csv|tsv)$/,
                use: 'csv-loader'
            },
            //加载xml文件
            {
                test: /\.xml$/,
                use: 'xml-loader'
            },
            {
                test: /\.toml$/i,
                type: 'json',
                parser: { parse: toml.parse, },
            },
            {
                test: /\.yaml$/i,
                type: 'json',
                parser: { parse: yaml.parse, },
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: { parse: json5.parse, },
            },
            //解析ES6+的js语法
            {
                test:/\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options: {
                        presets:['@babel/preset-env'],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime'
                            ]
                        ]
                    }
                }
            }
        ]
    },
    //优化配置
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin(),
        ],
        splitChunks:{
            cacheGroups: {
                vendor:{
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: "all"
                }
            }
        }
    }
}
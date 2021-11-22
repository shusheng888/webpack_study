###第一次webpack学习提交，主要学习了webpack.config.js的配置问题
明确了几个配置选项：<br/>
entry文件入口，<br/>
output文件出口（需要指定文件名，同时路径要用绝对路径),<br/>
mode模式选项，<br/>
plugins插件配置，webpack中的核心能力展示，先搞了一个HtmlWebpackPlugin自动生成index.HTML的<br/>

###清理dist目录
需要设置output.clean=true值<br/>

###sourcemap源代码追踪映射
devtool属性需要设置为'inline-source-map',可以在开发环境的源代码中追踪报错，可配置属性很多，具体翻看文档<br/>

###安装webpack-dev-server搭建本地web服务器开发环境
设置devServer.static打包文件存储路径，具有了热模块更新替换和实时重载功能<br/>

###资源模块
1.第一种自定义输出文件名<br/>
    在output.assetMoudleFilename属性配置以[contenthash][ext][query]为文件名发送到输出目录<br/>
2.第二种自定义输出文件名<br/>
    module.rules.generator.filename 重写asset资源的文件存储路径，优先级高于output
.assetMoudleFilename的路径<br/>
四种资源模块：<br/>
    1.asset/resource————>URI的形式访问<br/>
    2.asset/inline————>base64编码<br/>
    3.asset/source————>源代码<br/>
    4.asset————>根据文件大小阀值，智能选择resource和inline<br/>
###管理资源
webpack只能解析js和json文件，而loader可以让webpack去处理其他类型的文件，然后转换为对应模块<br/>
loader有两个属性，use和test，
####production和development的环境是不一样的
loader链式调用，逆序加载，webpack期望链式调用最后的loader返回JavaScript。
style-loader、css-loader用来加载css样式表文件
抽离css文件插件：mini-css-extract-plugin，需要在webpack5版本下工作
压缩css文件插件：css-minimizer-webpack-plugin，需要在optimization.minimizer属性下

###babel-loader压缩管理解析ES6+语法
babel-loader用于解析转化浏览器不支持的ES6+语法，将其转换成为浏览器支持的ES5语法<br/>
实际上，这里面存在着众多浏览器厂商的利益壁垒问题，所以才需要用到babel-loader插件
在babel-loader处理的过程中，需要同时安装以下三个插件：
babel-loader : 在webpack里应用 babel 解析ES6的桥梁
@babel/core : babel核心模块
@babel/preset-env : babel预设，一组插件的集合
regeneratorRuntime 是webpack打包生成的全局辅助函数，由babel生成，用于兼
容async/await的语法。
需要安装以下两个插件：npm i @babel/runtime @babel/plugin-transform-runtime -D
然后修改webpack配置
###第一次webpack学习提交，主要学习了webpack.config.js的配置问题
明确了几个配置选项：
entry文件入口，
output文件出口（需要指定文件名，同时路径要用绝对路径),
mode模式选项，
plugins插件配置，webpack中的核心能力展示，先搞了一个HtmlWebpackPlugin自动生成index.HTML的

###清理dist目录
需要设置output.clean=true值

###sourcemap源代码追踪映射
devtool属性需要设置为'inline-source-map',可以在开发环境的源代码中追踪报错，可配置属性很多，具体翻看文档



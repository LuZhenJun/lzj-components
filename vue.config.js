module.exports = {
    // pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错, 除了 entry 之外都是可选的
    pages: {
        //
        index: {
            entry: 'examples/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
            template: 'public/index.html', // 入口文件
            filename: 'index.html', // 打包后的文件名
        }
    },
    chainWebpack: config => {
        const jsRule = config.module.rule('js');
        // 坑1：packages文件里面必须有index.js抛出一个install;而且一定是要保证添加成功，不然没法使用use
        // 所以，在add之后，一定要使用end函数结束add过程，不然会报没有.use这个函数
        jsRule.include
            .add('/packages')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => options)
    }
};

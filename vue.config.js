module.exports = {

    chainWebpack: config => {
        //产品发布阶段main入口
        config.when(process.env.NODE_ENV === 'production', config => {
                config.entry('app').clear().add('./src/main-prod.js')
                    //通过externals加载CDN资源，如果有css的话在index头部添加CDn引用
                config.set('externals', {
                    vue: 'Vue',
                    'vue-router': 'VueRouter',
                    axios: 'axios',

                })
                config.plugin('html').tap(args => {
                    args[0].isProd = true
                    return args
                })
            })
            //产品开发阶段main入口
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')

            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }
}
//这是项目发布阶段所用到的babel插件
const prodPlugins = []



module.exports = {
    "presets": [
        "@vue/cli-plugin-babel/preset"
    ],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ],
        //发布产品时候的插件数组
        ...prodPlugins,
        "@babel/plugin-syntax-dynamic-import"
    ]
}
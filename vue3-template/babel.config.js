module.exports = {
  presets: [
    [
      "@babel/preset-env", // 预设包含了一组ES6转ES5的规则
      {
        useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        corejs: 3, // 指定core-js版本
        targets: {
          // 指定兼容性处理哪些浏览器
          chrome: "58",
          ie: "9",
        },
      },
    ],
    [
      "@babel/preset-typescript",
      {
        /**
         * 单文件.vue文件被 vue-loader 解析三个部分，script 部分会由 ts 来处理，但是ts不会处理 .vue 结尾的文件，所以要在预设里面加上 allExtensions: true配置项来支持所有文件扩展名。
         */
        allExtensions: true, // 支持所有文件扩展名
      },
    ],
  ],
};

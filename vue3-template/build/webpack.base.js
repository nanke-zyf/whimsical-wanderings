const path = require("path");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/*
 * 在开发环境我们希望css嵌入在style标签里面,方便样式热替换;
 * 但打包时我们希望把css单独抽离出来,方便配置缓存策略;
 * 插件mini-css-extract-plugin就是来帮我们做这件事的;
 * (mini-css-extract-plugin和style-loader不能同时使用)
 */
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

console.log("NODE_ENV", process.env.NODE_ENV);
console.log("APP_ENV", process.env.APP_ENV);
const isDev = process.env.NODE_ENV === "development"; // 是否是开发模式

module.exports = {
  entry: path.join(__dirname, "../src/main.ts"),
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "static/js/[name].[chunkhash:8].js",
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后的资源的访问路径前缀
  },
  cache: {
    // webpack5新增的配置, 缓存模块,提升二次构建速度
    type: "filesystem", // 使用文件缓存,缓存存储路径默认是node_modules/.cache/webpack
  },
  resolve: {
    // 配置解析模块路径别名: 优点:简写路径 缺点:路径没有提示
    extensions: [".js", ".ts"], // 可以省略的扩展名
    alias: {
      // 路径别名
      "@": path.join(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "../src")], // 只对项目src文件的vue进行loader解析
        test: /\.vue$/, // 匹配vue文件
        use: ["thread-loader", "vue-loader"], // hread-loader开启多进程打包,提升打包速度
      },
      {
        include: [path.resolve(__dirname, "../src")], // 只对项目src文件的js进行loader解析
        test: /\.ts$/, // 匹配ts文件
        use: ["thread-loader", "babel-loader"],
        // 为了避免webpack配置文件过于庞大,可以把babel-loader的配置抽离出来, 放到babel.config.js文件中
        // use: {
        //   loader: "babel-loader",
        // options: {
        //   presets: [
        //     [
        //       "@babel/preset-env", // 预设包含了一组ES6转ES5的规则
        //       {
        //         useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        //         corejs: 3, // 指定core-js版本
        //         targets: {
        //           // 指定兼容性处理哪些浏览器
        //           chrome: "58",
        //           ie: "9",
        //         },
        //       },
        //     ],
        //     [
        //       "@babel/preset-typescript",
        //       {
        //         /**
        //          * 单文件.vue文件被 vue-loader 解析三个部分，script 部分会由 ts 来处理，但是ts不会处理 .vue 结尾的文件，所以要在预设里面加上 allExtensions: true配置项来支持所有文件扩展名。
        //          */
        //         allExtensions: true, // 支持所有文件扩展名
        //       },
        //     ],
        //   ],
        // },
        // },
      },
      {
        test: /\.css$/, //匹配所有的 css 文件
        include: [path.resolve(__dirname, "../src")],
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        include: [path.resolve(__dirname, "../src")], // 只对项目src文件的csss进行loader解析
        test: /\.scss$/, // 匹配scss文件
        /**
         * css-loader: 解析css文件代码,把解析后的结果交给style-loader去处理
         * style-loader: 把解析后的css代码从js中抽离,放到头部的style标签中
         * sass-loader: 把sass/scss代码解析成css代码
         * postcss-loader: 为css代码加上浏览器前缀
         * autoprefixer 插件: 决定添加哪些浏览器前缀到css中, 需要有一份要兼容浏览器的清单.browserslistrc,让postcss-loader知道要加哪些浏览器的前缀
         */
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: ["autoprefixer"], // 提取到postcss.config.js中进行配置
          //     },
          //   },
          // },
          "sass-loader",
        ], // 从右向左解析原则
      },
      {
        include: [path.resolve(__dirname, "../src")],
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, // 匹配图片文件
        type: "asset", // webpack5内置了asset模块,可以处理图片文件
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb, 超过10kb就会被解析成base64格式的字符串,否则解析成二进制格式
          },
        },
        generator: {
          filename: "static/images/[name].[contenthash:8][ext]", // 指定打包后的图片的名字和路径
        },
      },
      {
        include: [path.resolve(__dirname, "../src")], // 只对项目src文件的字体文件进行loader解析
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 匹配字体文件
        type: "asset/resource", // webpack5内置了asset模块,可以处理字体文件
        generator: {
          filename: "static/fonts/[name].[contenthash:8][ext]", // 指定打包后的字体的名字和路径
        },
      },
      {
        include: [path.resolve(__dirname, "../src")], // 只对项目src文件的媒体文件进行loader解析
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, // 匹配媒体文件
        type: "asset/resource", // webpack5内置了asset模块,可以处理媒体文件
        generator: {
          filename: "static/media/[name].[contenthash:8][ext]", // 指定打包后的媒体的名字和路径
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(), // vue-loader必须配合VueLoaderPlugin使用
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../public/index.html"), // 指定模板页面
      inject: true, // 自动把打包好的js/css文件注入到页面中
    }),
    new webpack.DefinePlugin({
      // 定义环境变量, 在这里配置后会把值注入到业务代码里面去,webpack解析代码匹配到process.env.NODE_ENV,就会获取到对应的值
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        APP_ENV: JSON.stringify(process.env.APP_ENV),
      },
    }),
  ],
};

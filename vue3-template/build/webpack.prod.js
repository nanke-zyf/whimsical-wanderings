const path = require("path");
const { merge } = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const CssMiniMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const globAll = require("glob-all");

const baseConfig = require("./webpack.base.js");

// 合并base配置,配置生产环境
module.exports = merge(baseConfig, {
  mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  // devtool: "cheap-module-source-map", // 源代码调试模式,生产环境可不配，如果需要线上排查问题，可以配置为cheap-module-source-map
  // externals作用： 配置外部扩展,不会打包到bundle中
  externals: {},
  // ignorePlugin作用：忽略某些模块，让webpack不把这些指定的模块打包进去，减少打包时间
  // ignorePlugin: [],
  plugins: [
    /**
     *  开发环境已经在devServer中配置了static托管了public文件夹,在开发环境使用绝对路径可以访问到public下的文件,
     * 但是在生产环境中,打包后的文件是放在dist目录下的,所以需要配置copy-webpack-plugin插件,把public下的文件复制到dist目录下
     */
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, "../public"), // 复制public下的静态资源文件
          to: path.join(__dirname, "../dist"), // 复制到dist目录中
          globOptions: {
            ignore: ["**/index.html"], // 忽略index.html文件
          },
        },
      ],
    }),
    new MiniCssExtractPlugin({
      // 抽离css文件
      filename: "static/css/[name].[contenthash:8].css", // 指定抽离后的css文件的名字和路径
    }),
    // 清理无用css
    new PurgeCSSPlugin({
      // 检测src下所有vue文件和public下index.html中使用的类名和id和标签名称
      // 只打包这些文件中用到的样式
      paths: globAll.sync([
        `${path.join(__dirname, "../src")}/**/*.vue`,
        path.join(__dirname, "../public/index.html"),
      ]),
      safelist: {
        standard: [/^el-/], // 过滤以el-开头的类名，哪怕没用到也不删除
      },
    }),
    // 开启gzip压缩, 可以有效减少静态资源文件大小,压缩率在 70% 左右
    new CompressionPlugin({
      test: /.(js|css)$/, // 只生成css,js压缩文件
      filename: "[path][base].gz", // 文件命名
      algorithm: "gzip", // 压缩格式,默认是gzip
      test: /.(js|css)$/, // 只生成css,js压缩文件
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8, // 压缩率,默认值是 0.8
    }),
  ],
  optimization: {
    minimize: true, // 开启代码压缩
    minimizer: [
      // 压缩css
      new CssMiniMinimizerPlugin({
        parallel: true, // 开启多进程并行压缩
      }),
      new TerserPlugin({
        parallel: true, // 开启多进程并行压缩
        terserOptions: {
          compress: {
            // pure_funcs: ["console.log"] // 删除console.log
          },
        },
      }),
    ],
    /**
     * 一般第三方包的代码变化频率比较小,可以单独把node_modules中的代码单独打包, 当第三包代码没变化时,对应chunkhash值也不会变化,可以有效利用浏览器缓存
     * 还有公共的模块也可以提取出来,避免重复打包
     *
     * 打包结果：
     * 1. vendors.8788ea83.js: 第三方包代码
     * 2. commons.8b16c942.js: 公共代码
     * 3. main.8b16c935.js: 业务代码
     *
     * 修改app.vue后，只有main.js的chunkhash值变化，这样发版后,浏览器就可以继续使用缓存中的endors.8788ea83.js,只需要重新请求main.js就可以了
     */
    splitChunks: {
      cacheGroups: {
        vendors: {
          // 提取node_modules代码
          test: /node_modules/, // 只匹配node_modules里面的模块
          name: "vendors", // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        commons: {
          // 提取页面公共代码
          name: "commons", // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        },
      },
    },
  },
});

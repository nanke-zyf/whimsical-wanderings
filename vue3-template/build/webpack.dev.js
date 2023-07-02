const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

// 合并base配置,配置开发环境
module.exports = merge(baseConfig, {
  mode: "development", // 开发环境,打包更加快速,省了代码优化步骤
  /**
   * eval-cheap-module-source-map 含义
   * eval: 使用eval包裹模块代码, 模块代码会被执行, 并且会在末尾追加注释, 以//# sourceURL=webpack-internal:///${requestShortener.shorten(data.resource)}为结尾
   * cheap: 不包含列信息, 不包含loader的sourcemap
   * module: 包含loader的sourcemap
   * source-map: 生成独立的map文件, 用于生产环境
   *
   * 其他组合：
   * hidden-source-map: 生成独立的map文件, 但是不会在bundle文件中追加注释
   * inline-source-map: 生成内联的map文件, 用于开发环境
   * eval-source-map: 生成内联的map文件, 并且每个模块都使用eval执行, 用于开发环境
   * cheap-module-source-map: 生成独立的map文件, 不包含列信息, 不包含loader的sourcemap
   * cheap-source-map: 生成独立的map文件, 不包含列信息, 包含loader的sourcemap
   * nosources-source-map: 生成独立的没有源代码的map文件, 用于生产环境
   */
  devtool: "eval-cheap-module-source-map", // 源代码调试模式,开发环境推荐eval-cheap-module-source-map,生产环境可不配置
  devServer: {
    port: 3000, // 端口号
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 热更新
    historyApiFallback: true, // 任意的 404 响应都被替代为 index.html
    static: {
      directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
    },
  },
});

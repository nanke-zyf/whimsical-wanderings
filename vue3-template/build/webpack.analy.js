const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { merge } = require("webpack-merge");
const prodConfig = require("./webpack.prod.js");

const smp = new SpeedMeasurePlugin();

// 用smp.wrap包裹一下,就可以分析打包速度了， 分析打包构建速度的webpack配置, 会分析每个loader和plugin的耗时
module.exports = smp.wrap(
  merge(prodConfig, {
    plugins: [
      // 分析打包后的文件大小
      new BundleAnalyzerPlugin(),
    ],
  })
);

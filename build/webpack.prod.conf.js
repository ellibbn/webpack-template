const path = require("path");
const merge = require('webpack-merge');
const webpack = require("webpack");
const commonConfig = require('./webpack.base.conf.js');
const WorkboxPlugin = require('workbox-webpack-plugin'); // 引入 PWA 插件

module.exports = merge(commonConfig, {
	mode: "production",
	devtool: 'cheap-module-source-map',
	output: {
    publicPath: '/',  // 打包路径
		// 输出目录
		path: path.resolve(__dirname, "../dist"),
		// 文件名称
    filename: "bundle.[name].[hash].js",
		chunkFilename: '[name].[hash].js'
	},
	optimization: {
		usedExports: true,
		splitChunks: {
			chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
			cacheGroups: {
				// 公共代码打包分组配置
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors'
				}
			}
		},
	},
	plugins: [
		// PWA配置，生产环境才需要
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true
    }),
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production'),
    // }),
	]
});
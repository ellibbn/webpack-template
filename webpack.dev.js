const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'release'),
    compress: true,
    port: 8080,
    hot: true,
    open: true,
    openPage: 'home.html',
    proxy: {
      // '/': {
      //   target: 'http://xxxxxxxx',
      //   changeOrigin: true,
      //   // pathRewrite: { '^/api': '' },
      // },
    },
  },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        loader: 'url-loader',
        options: {
          limit: 10000000,
          name: 'images/[name].[ext]',
        },
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      // },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin({})],
});

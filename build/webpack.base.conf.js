const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: ['./src/index.js'],
  output: {
    // 输出目录
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      // {
      //   // 前置(在执行编译之前去执行eslint-loader检查代码规范，有报错就不执行编译)
      //   enforce: 'pre',
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: 'eslint-loader',
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          // MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
          'sass-loader', // 编译scss
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        use: {
          loader: 'url-loader',
          options: {
            outputPath: 'images/', // 图片输出的路径
            limit: 10 * 1024,
          },
        },
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
              publicPath: 'fonts/',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 最终创建的文件名
      template: path.join(__dirname, '../public/index.html'), // 指定模板路径
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, './dist'),
    host: '0.0.0.0', // 可以使用手机访问
    port: 8586,
    historyApiFallback: true, // 该选项的作用所有的404都连接到index.html
    // proxy: {
    //   // 代理到后端的服务地址，会拦截所有以api开头的请求地址
    //   "/api": "http://localhost:3000"
    // }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, '../src'),
    },
  },
  optimization: {
    splitChunks: {
      // 代码分割按需加载、提取公共代码
      chunks: 'all', // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    },
  },
  performance: false, // 关闭性能提示
};

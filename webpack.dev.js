const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const app = {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './src/index.jsx',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
};

const gameMaster = {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, './src/components/GM.jsx'),
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'gmBundle.js',
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: 'src/GM.html',
    // }),
  ],
};

module.exports = [
  merge(common, app),
  merge(common, gameMaster),
];

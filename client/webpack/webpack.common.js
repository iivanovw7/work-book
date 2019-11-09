const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1000, // if less than 10 kb, adds base64 encoded image to css
            name: 'assets/images/[hash].[ext]' // if more than 10 kb falls to file-loader
          }
        }]
      },
      {
        test: /\.(woff|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000, // if less than 10 kb, adds base64 encoded image to css
            name: 'assets/fonts/[hash].[ext]' // if more than 10 kb falls to file-loader
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', 'css']
  },
  entry: './src/index.jsx',
  node: {
    fs: 'empty'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Production'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    // new StatsWriterPlugin({
    //   fields: ['assets', 'modules']
    // }),
    new Dotenv(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  output: {
    filename: 'assets/js/[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  }
};

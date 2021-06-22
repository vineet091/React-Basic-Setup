const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");
const DEV_SERVER = {
  hot: true,
  historyApiFallback: true,
  overlay: true,
  inline: true,
  port: 9000
  // inline: false,
  // stats: 'verbose',
  // proxy: {
  //   '/api': 'http://localhost:3000'
  // },
};
module.exports = {
  cache: true,
  mode: "production",
  devtool: "eval-source-map",
  devServer: DEV_SERVER,

  entry: [path.resolve(__dirname, "../public/index.js")],
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "build/[name]-[chunkhash].js",
    chunkFilename: "build/[name]-[chunkhash].js"
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"]
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build'], {
      root: __dirname + '/' + '../dist'
    }),
    new MiniCssExtractPlugin({
      filename: "build/styles.css"
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../index.html"),
      minify: false
    })
  ],

  // webpack optimizations
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js$/,
        exclude: /node_modules/,
        sourceMap: true,
        uglifyOptions: {
          compress: {},
          mangle: true
        }
      })
    ],
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          chunks: "all", // both : consider sync + async chunks for evaluation
          name: "vendor",
          test: /node_modules/
        }
        // vendor1: {
        //     chunks: 'all', // both : consider sync + async chunks for evaluation
        //     name: 'vendor1', // name of chunk file
        //     test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/, // test regular expression
        // },
        // vendor2: {
        //   chunks: 'all',
        //   name: 'vendor2', // name of chunk file
        //   test: /[\\/]node_modules[\\/](!react)(!react-dom)[\\/]/, // test regular expression
        // }
      }
    }
  }
};

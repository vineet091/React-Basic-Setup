const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
// const Dotenv = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");
const CleanWebpackPlugin = require("clean-webpack-plugin");
// const nodeExternals = require('webpack-node-externals');
// const __APP_ENV__ = process.env.APP_ENV;
// const __APP_PUBLIC_PATH__ = process.env.APP_PUBLIC_PATH;
// const __BUILD_DIR__ = path.resolve(__dirname, './build/server');
// const __SERVER_DIR__ = path.resolve(__dirname, "../server");
// const isProd = process.env.NODE_ENV === "production";

const DEV_SERVER = {
  hot: true
  // inline: false,
  // stats: 'verbose',
  // proxy: {
  //   '/api': 'http://localhost:3000'
  // },
};

module.exports = {
  stats: {
    errorDetails: true
  },
  devtool: "eval-source-map",
  // Entry point of file, which file need to bundle
  entry: path.resolve(path.join(__dirname, "../server/index.js")),

  // Exclude built in package and include extention file like all .css file will be include
  // If you remove this, package will be include due to that error will come
  //   externals: [
  // 		nodeExternals({ whitelist: [/\.css$/] }),
  // 		// /assetsManifest.json/,
  //   ],

  // Mode is development for now
  //   externals: [
  //     nodeExternals({ whitelist: [/\.css$/] }),
  //     /assetsManifest.json/,
  // ],
  mode: "production",
  target: "node",
  externals: [nodeExternals({
    importType: 'amd'
  })],
  output: {
    path: path.resolve(__dirname, "../build/"),
    filename: "bundle.js",
    libraryTarget: 'amd'
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  plugins: [
    // Its an optional plugin that tells the reloader to not reload if there is an error.
    // The error is simply printed in the console, and the page does not reload.
    // If you do not have this plugin enabled and you have an error, a red screen of death is thrown
    // A webpack plugin to remove/clean your build folder(s) before building
    new CleanWebpackPlugin(["../build/bundle"]),
    new webpack.DefinePlugin({
      __BROWSER__: false,
      "process.env": {
        // NODE_ENV: JSON.stringify("production"),
        APP_SSR: true
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          }
        ]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/
      }
    ]
  }
};

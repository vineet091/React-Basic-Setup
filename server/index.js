// /* eslint consistent-return:0 */
// import express from "express";
// //import webpack from "webpack";
// // import webpackDevMiddleware from "webpack-dev-middleware";
// // import config from "../config/webpack.config";
// // const logger = require('./util//logger');

// // const argv = require('./util/argv');
// import renderMiddleware from "./middlewares/renderMiddleware";
// const app = express();

// // const compiler = webpack(config);
// // app.use(
// //   webpackDevMiddleware(compiler, {
// //     //noInfo: true,
// //     publicPath: config.output.publicPath
// //   })
// // );

// // If you need a backend, e.g. an API, add your custom backend-specific middleware here
// // app.use('/api', myApi);

// // In production we need to pass these values in instead of relying on webpack

// app.use("*", renderMiddleware);

// // get the intended host and port number, use localhost and port 3000 if not provided
// const customHost = process.env.HOST;
// const host = customHost || null; // Let http.Server use its default IPv6/4 host
// const prettyHost = customHost || "localhost";
// const port = parseInt(process.env.PORT || "8080", 10);

// // Start your app.
// app.listen(port, host, err => {
//   if (err) {
//     return console.log(err);
//   } else {
//     console.log('process.env.NODE_ENV', process.env.NODE_ENV, process.env.APP_SSR);
//     console.log("Application running on port: " + port);
//   }
// });
const path = require( 'path' );

// ignore `.scss` imports
require('ignore-styles');

// transpile imports on the fly
require('@babel/register');

require('./express.js');
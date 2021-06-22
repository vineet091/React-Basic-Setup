const express = require( 'express' );
const path = require( 'path' );
import renderMiddleware from "./middlewares/renderMiddleware";


// create express application
const app = express();

// serve static assets
app.get( /\.(js|css|map|ico)$/, express.static( path.resolve( __dirname, '../dist' ) ) );

app.use("*", renderMiddleware);


// run express server on port 9000
app.listen( '8080', () => {
    console.log( 'Express server started at http://localhost:8080' );
} );
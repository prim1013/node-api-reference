var express = require( 'express' );
var expressValidator = require( 'express-validator' );
var path = require( 'path' );
var favicon = require( 'serve-favicon' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var config = require( 'config' );
var app = express();
var server = require( 'http' ).Server( app );
var io = require( 'socket.io' )( server );

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'hbs' );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended: false} ) );
app.use( cookieParser() );
app.use( express.static( path.join( __dirname, 'public' ) ) );
app.use( expressValidator() );

app.use( function ( req, res, next ) {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Headers', 'content-type, Authorization' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE' );
    next();
} );

app.get( '/', function ( req, res ) {
    res.sendfile( __dirname + '/index.html' );
} );

// ERROR HANDLERS
// development error handler, will print stacktrace
if ( app.get( 'env' ) === 'development' ) {
    app.use( function ( err, req, res, next ) {
        res.status( err.status || 500 );

        res.setHeader( 'Content-Type', 'application/json' );
        res.send( JSON.stringify( {message: err.message, stack: err.stack} ) );
    } );
}
// production error handler, no stacktraces leaked to user
app.use( function ( err, req, res, next ) {
    res.status( err.status || 500 );
    res.setHeader( 'Content-Type', 'application/json' );
    res.send( JSON.stringify( {message: err.message} ) );
} );

io.on( 'connection', function ( socket ) {
    console.log( 'a user connected' );
    socket.emit( 'news', {hello: 'world'} );
} );

module.exports = app;
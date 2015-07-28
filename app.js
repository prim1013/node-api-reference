var express = require( 'express' );
var path = require( 'path' );
var config = require( 'config' );
var mongoose = require( 'mongoose' );
var logger = require( 'morgan' );
var cookieParser = require( 'cookie-parser' );
var bodyParser = require( 'body-parser' );
var routes = require( './routes/index' );
var app = express();
//var conn = config.get( 'data.leasing.connection' );

//mongoose.connect( conn );
//cache.connect( config.get( 'redis' ) );

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'hbs' );

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use( logger( 'dev' ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( {extended: false} ) );
app.use( cookieParser() );
app.use( require( 'less-middleware' )( path.join( __dirname, 'public' ) ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

//app.use( function ( req, res, next ) {
//    sanitizer.sanitizeRequestBody( req );
//    sanitizer.sanitizeRequestQueryString( req );
//    next();
//} );

// Add Cross Domain Authorization
// TODO - REMOVE Origin '*'
app.use( function ( req, res, next ) {
    res.setHeader( 'Access-Control-Allow-Origin', '*' );
    res.setHeader( 'Access-Control-Allow-Headers', 'content-type, Authorization' );
    res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE' );
    res.setHeader( 'Access-Control-Expose-Headers', 'Location' );
    next();
} );

app.use( '/', routes );

// error handlers
// development error handler
// will print stacktrace
//if ( app.get( 'env' ) === 'development' ) {
if ( 1 === 1 ) {
    app.use( function ( err, req, res, next ) {
        var status = err.status || 500;
        res.status( status ).send( {status: status, message: err.message, stack: err} );
    } );
}

// production error handler
// no stacktraces leaked to user
app.use( function ( err, req, res, next ) {
    var status = err.status || 500;
    res.status( status ).send( {status: status, message: err.message} );
} );

module.exports = app;
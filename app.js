var express = require( 'express' );
var util    = require( 'util' );
var path    = require( 'path' );
var query   = require( 'qs' );
var service = require( './config/service' );
var oauth   = require( './config/oauth' );
var app     = express();
var parser  = {
	cookie  : require( 'cookie-parser' ),
	body    : require( 'body-parser' ),
	session : require( 'express-session' ),
};

// view engine setup
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'jade' );
app.use( parser.body.json() );
app.use( parser.body.urlencoded({ extended: false }) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// set session setup
app.use( parser.session({
	secret            : '6ygasdddasbdhkTRwh765',
  	resave            : false,
  	saveUninitialized : true
}));

function isLogged(req) {
	var access = req.session.access || {};
	return access.token && access.secret;
};

app.get( '/callback', function(req, res) {
	oauth.getOAuthAccessToken(
		req.session.token,
		req.session.secret,
		req.query.oauth_verifier,
		function(error, token, secret, results) {
			if ( error ) {
	        	res.send( 'error' );
	        	return;
	  		}

	      	req.session.access.token  = token;
			req.session.access.secret = secret;
			res.redirect( 'http://localhost:3000' );
		}
	);
});

app.get( '/auth', function(req, res) {
	oauth.getOAuthRequestToken(function(error, token, secret, results) {
		if ( error ) {
      		res.send( 'error' );
			return;
		}

		req.session.access = {};
		req.session.token  = token;
		req.session.secret = secret;
		res.redirect( 'http://localhost/rest/oauth1/authorize/?oauth_token=' + token );
	});
});

app.get( '/logout', function(req, res) {
	req.session.access = null;
	req.session.token  = null;
	req.session.secret = null;
	res.redirect( 'http://localhost:3000' );
});

app.get( '/rest', function(req, res) {
	var route = req.query.route;
	var args  = query.stringify( delete req.query.route && req.query );
	var url   = service.json + route + ( args ? '?' + args : '' );

	oauth.get(
		  url
		, req.session.access.token
  		, req.session.access.secret
		, function(error, response, result) {
			res.set( 'Content-Type', 'application/json' );
			res.send( response );
		}
	);
});

app.post( '/rest', function(req, res) {
	var url = service.json + req.body.route;

	oauth.post(
		  url
		, req.session.access.token
		, req.session.access.secret
		, delete req.body.route && req.body
		, false
		, function(error, response, result) {
			res.set( 'Content-Type', 'application/json' );
			res.send( response );
		}
	);
});

app.get( '/', function(req, res) {
	if ( !isLogged( req ) ) {
		res.render( 'login' );
		return;
	}

	res.render( 'index' );
});

app.listen( 3000, function() {
	console.log( 'listening on port 3000' );
});

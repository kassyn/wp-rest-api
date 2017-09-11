var fetch    = require( 'node-fetch' );
var hmacsha1 = require( 'hmacsha1' );
var qs       = require( 'qs' );
var MURPHY   = {};

//Client Key M6GVW4e6UOyS
//Client Secret HSyis5XJ7omfZgNBSixNCdKYlQzsLsvr7k1gOQpszQeEWowf
//Access Token VzXlhjBb7iBkf9JuUgQ1iqw6
//Access Secret EYY15Yk1UeKjFBMJFPefyL2YXjrC0uYlLRC4uTrUOXHNRNSd

MURPHY.config = {
	clientKey:    'KVkDzH7xLjn8',
	clientSecret: 'zwpG9VgSjMW119DwCjMfXY7tRnQ3q31MBZSz0b7MFW9IZtEI',
	token:        'qguRBFaemmKeos96nuuDOcCk',
	tokenSecret:  'UDboud7ESJ9rx8OzOPCojMs2Z8ZsJ0twKfoo9bDd75Rdvnr6'
};

var utils = {
	nonce: function(length) {
		var chars  = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
		var result = '';
		var rnum   = '';

		for ( var i = 0; i < length; ++i ) {
			rnum    = Math.floor( Math.random() * chars.length );
			result += chars.substring( rnum, rnum + 1 );
		}

		return result;
	},

	timestamp: function() {
		var t = ( new Date() ).getTime() + 0;
		return Math.floor( t / 1000 );
	},
};

var OAuthHeader = function(url, method, data) {
	return this.initialize( url, method, data );
};

OAuthHeader.prototype.setConfig = function() {
	this.key = [
		MURPHY.config.clientSecret,
		MURPHY.config.tokenSecret
	].join( '&' );

	this.auths = {
		'oauth_consumer_key'     : MURPHY.config.clientKey,
		'oauth_nonce'            : utils.nonce( 6 ),
		'oauth_signature_method' : 'HMAC-SHA1',
		'oauth_timestamp'        : utils.timestamp(),
		'oauth_token'            : MURPHY.config.token,
	};
};

OAuthHeader.prototype.initialize = function(url, method, data) {
	this.setConfig( url, method, data );
	this.auths['oauth_signature'] = this.getSignature( url, method, data );

	return this.getHeaderObject();
};

OAuthHeader.prototype.getSignature = function(url, method, data) {
	var params = Object.assign( data, this.auths );

	var signature = [
		  method
		, encodeURIComponent( url )
		, this.transformParamsEnconde( params )
	];

	return hmacsha1( this.key, signature.join( '&' ) );
};

OAuthHeader.prototype.transformParamsEnconde = function(params) {
	var transform = this.convertFormSubmitString( params );

	return encodeURIComponent( transform.sort().join( '&' ) );
};

OAuthHeader.prototype.convertFormSubmitString = function(obj, wrapper) {
	var params = []
	  , item   = null
	;

	wrapper = ( wrapper || '' );

	for ( item in obj ) {
		params.push( item + '=' + wrapper + encodeURIComponent( obj[item] ) + wrapper );
	}

	return params;
};

OAuthHeader.prototype.getHeaderObject = function() {
	var transform = this.convertFormSubmitString( this.auths, '"' );

	return {
		'Authorization' : 'OAuth realm="WP-API", ' + transform.join( ', ' )
	};
};


// var body = {
// 	username: 'kassyntecs@gmail.com',
// 	email: 'kassyntecs@gmail.com',
// 	password: '123ss',
// 	name: 'Accácio Jasson Franklin'
// };

var body = {
	username: 'teste@gmail.com',
	password: '123'
};

var url = 'http://receitinhasrest.validasite.com/wp-json/wp/v2/users/auth';

var authorization = new OAuthHeader( url, 'POST', body );

//....................
fetch( url, {
	method: 'POST',
	headers: Object.assign( authorization, {
		'Content-Type':'application/x-www-form-urlencoded'
	}),
	body: qs.stringify( body )
})
.catch(function(error) {
	console.log( 'error', error );
})
.then(function(res) {
	res.json().then(function(json) {
		console.log( json );
	});
});

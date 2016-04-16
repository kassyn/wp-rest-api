var OAuth   = require( 'oauth' );
var service = require( './service' );

module.exports = new OAuth.OAuth(
	service.oauth.request,
	service.oauth.access,
	service.oauth.key,
	service.oauth.secret,
	'1.0',
	'http://localhost:3000/callback/',
	'HMAC-SHA1'
);

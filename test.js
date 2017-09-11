var OAuth = require( 'oauth' );

var OAuth2 = OAuth.OAuth2;
var twitterConsumerKey = 'your key';
var twitterConsumerSecret = 'your secret';

var oauth2 = new OAuth2(
	'uGfE2PEf29rZI7T9bBRcTtgrlrOU9aSGSEiFRI41',
	'wOgdCN0jLAaE5cCcoI9GENf0LvmefwDu18CUybM4p6jnNWvZiy',
	'https://minter.io/',
	'oauth/authorize',
	'oauth/token',
	null
);

oauth2.getOAuthAccessToken(
	'',
	{'grant_type':'client_credentials'},
	function (e, access_token, refresh_token, results){
		console.log('bearer: ', access_token );
	}
);

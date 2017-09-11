# wp-rest-api
Example app with WP REST API and React

//FQtVMjKGinaV2snes3Q7jbf4 pG5PSUP7WzfbmVpR7xl1WZy85fX3rrNGVVpxCNcinYfxMOgQ
var jade = require( 'jade' );
var fs   = require( 'fs' );

app.get( '/posts/:name', function(req, res) {
	var name = req.params.name
	  , url  = service.json + 'posts/?filter[name]=' + name
	;

	console.log( 'request => post %s', name );

	oauth.get(
		  url
		, 'FQtVMjKGinaV2snes3Q7jbf4'
  		, 'pG5PSUP7WzfbmVpR7xl1WZy85fX3rrNGVVpxCNcinYfxMOgQ'
		, function(error, response, result) {
			var posts = JSON.parse( response )
			  , path  = 'public/posts/' + name
			  , html  = ''
			;

			if ( !posts || !posts.length ) {
				res.send( '404' );
				return;
			}

			html = jade.renderFile( 'views/article.jade', posts[0] );
			//
			fs.mkdir( path, function() {
				fs.writeFile( path + '/index.html', html, function(werror) {
					console.log( werror ? werror : 'save folder and file %s', path + '/index.html' );
				});
			});

			res.send( html );
		}
	);
});

module.exports = function(grunt) {
	require( 'load-grunt-tasks' )( grunt );
	require( 'time-grunt' )( grunt );

	var options = {
		config : {
			src: 'grunt-tasks/*.js'
		}
	};

	var configs = require( 'load-grunt-configs' )( grunt, options );

	grunt.initConfig( configs );
	grunt.registerTask( 'deploy', ['babel', 'concat', 'uglify'] );
};

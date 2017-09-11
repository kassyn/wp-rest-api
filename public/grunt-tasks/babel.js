module.exports = {
    options : {
        sourceMap : false,
        presets : ['react', 'es2015']
    },
    app : {
		files : [{
			expand : true,
			cwd : 'assets/javascripts/app/jsx',
			src : ['*.js'],
			dest : 'assets/javascripts/app/',
			ext : '.js'
	    }]
    }
};

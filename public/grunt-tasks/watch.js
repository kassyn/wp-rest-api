module.exports =  {
	scripts : {
		files : '<%= concat.app.src %>',
		tasks : ['concat']
	},
	jsx : {
		files : 'assets/javascripts/app/jsx/*.js',
		tasks : ['babel', 'concat']
	}
};

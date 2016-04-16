module.exports = {
	options : {
		separator : ';'
	},
	app : {
		src : [
			'assets/javascripts/libs/*.js',
			'assets/javascripts/vendor/*.js',
			'assets/javascripts/app/*.js',
			'assets/javascripts/boot.js'
		],
		dest : 'assets/javascripts/built.js',
	}
};

//m48IAQSaC36QK4dvl1HN5Sxi
//uKIyBmJax8AvMgW6kchNw4aU02P6WMw4FijqQqOCqDdaOVKz

var base = 'http://localhost/rest';

module.exports = {
	url   : base,
	json  : base + '/wp-json/wp/v2/',
	oauth : {
		request  : base + '/oauth1/request',
		access   : base + '/oauth1/access',
		key      : 'AAb0LB2fqLNJ',
		secret   : 'vpexOqzEw6OooXOG6QFLVoUla238sBo9nhcnOYm4GpgkhbHG'
	},
};

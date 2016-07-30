const 	async = require('async'),
		request = require('request'),
		utils = require('../libs/utils');

module.exports = function(router){
	/* GET home page. */
	//localhost/
	router.get('/(^\/|index+(.html|.htm))?/', function(req, res) {
		

		var arrData = [{
	 		list
	 	}], array,
			urls= [
		  "http://admin.starmaker.com.br/wp-json/wp-api-menus/v2/menus/",
		  
		];


		async.map(urls, utils.httpGet, function (err, result){
		  	if (err) return console.log(err);

				var slide = result[1],
					post = JSON.stringify(result[0]);
		  		
		  		
		  		array =  JSON.parse(post).map(function(item) {
			   		
		    		return {id: item.term_id, nome: item.name};

				})/*.sort(function(a, b) { 
				  	return a.id - b.id;
				});*/


				
				res.render('pages/index.ejs', {
	 				Menu: array,
	 				Slider: arrData[0].Slider,
	 				Solucao: arrData[0].Solucao
	 				
	 			});
	 			
		});
	
	});
}


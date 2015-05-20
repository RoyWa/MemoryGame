(function() {
	"use strict";

	var fact= angular.module("FactoriesModule", []);
	fact.constant('ENUMS', {
		Providers: {
			Movies:	{id:1 ,title: 'Movies Catalog', data: "movies.json"},
			Dogs:	{id:2 ,title: 'Dogs Sell & Adoption',  data: "dogs.json"},
			Cloths: {id:3 ,title: 'Cloths & Febrics',  data: "cloths.json"},
			Gadgets:{id:4 ,title: 'Gadgets & Electronics',  data: "gadgets.json"}
		}
	});


	fact.factory('fetchDataService', function($http, $q) {
		
		var data = [];  
		var myService = {};

		myService.async = function(jsonFile) {
			var deffered = $q.defer(); //rrr- declaring the deffer over here will enforce to return new promise everytime
			$http.get(jsonFile)
			.success(	function (d, status) {
				console.log('status', status);
				data = d.records;
      			deffered.resolve();
  			})
  			.error(	function (d, status) {
				console.log('error', status);
  			});
			return deffered.promise;
		};
		myService.data = function() { return data; };

		return myService;
	});


})();
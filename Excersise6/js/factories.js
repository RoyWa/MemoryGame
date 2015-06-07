(function() {
	"use strict";

	var fact= angular.module("FactoriesModule", []);

	/**
	* @ngdoc interface
	* @name FactoriesModule.ENUMS
	* @description
	* Object that store all aviliable catalogs and their patterns to make requests feching the required data.
	* @example   $scope.setCatalog(ENUMS.Providers.Movies); 
	*/
	fact.constant('ENUMS', {
		Providers: {
			Movies:	{id:1 ,title: 'Movies Catalog', data: "data/movies.json"},
			Dogs:	{id:2 ,title: 'Dogs Sell & Adoption',  data: "data/dogs.json"},
			Cloths: {id:3 ,title: 'Cloths & Febrics',  data: "data/cloths.json"},
			Gadgets:{id:4 ,title: 'Gadgets & Electronics',  data: "data/gadgets.json"}
		}
	});


	/**
	 * @ngdoc service
	 * @name FactoriesModule.fetchDataService
     * @requires $http 
     * @requires $q
	 * @description
	 * # fetchDataService
	 * Service to talk with backend api ang getting the json data via http.
	 */
	fact.factory('fetchDataService', function($http, $q) {
		
		var data = [];  
		var myService = {};

	    /**
	     * @ngdoc
	     * @name FactoriesModule.fetchDataService#async
	     * @methodOf FactoriesModule.fetchDataService
	     * @param {string} jsonFile - the URL to the file to be retrieved
	     * @description
	     * Method to get data form the backend api by using '$http' service
	     * @example
	     * fetchDataService.data();
	     * @returns {httpPromise} resolve with fetched data, or fails with error description.
	     */
		myService.async = function(jsonFile) {
			var deffered = $q.defer(); //rrr- declaring the deffer over here will enforce to return new promise everytime
			$http.get(jsonFile, {cache:true })
			.success(	function (d, status) {
				data = d.records;
      			deffered.resolve();
  			})
  			.error(	function (d, status) {
				console.log('error', status);
  			});
			return deffered.promise;
		};

	    /**
	     * @ngdoc
	     * @name FactoriesModule.fetchDataService#data
	     * @methodOf FactoriesModule.fetchDataService
	     *
	     * @description
	     * Method to get data form the backend api
	     * @example
	     * fetchDataService.data();
	     * @returns {httpPromise} resolve with fetched data, or fails with error description.
	     */
		myService.data = function() { return data; };

		return myService;
	});


})();
(function() {
	"use strict";

	var fact= angular.module("FactoriesModule", []);


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
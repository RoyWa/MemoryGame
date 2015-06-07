(function () {
  'use strict';

  /**
 * @ngdoc overview
 * @name RoyApp
 * @requires FactoriesModule 
 * @requires DirectivesModule
 * @description
 * This is the main application module, which does the following:
 *
 *   - loads all the submodules
 *   - defines routes via `ENUMS`
 * https://github.com/angular/dgeni-packages/blob/master/NOTES.md#ngdoc-tags
 **/
  var app = angular.module('RoyApp', [ 'FactoriesModule' , 'DirectivesModule',  '_Spy_' ]);


/**
 * @ngdoc method
 * @name RoyApp.controller:MainCtrl#run
 * @requires $templateCache
 * @methodOf RoyApp.controller:MainCtrl
 * @description
 * Speed up my AngularJS app by automatically minifying, combining, and automatically caching your HTML templates with $templateCache
 */
 app.run(["$templateCache", function ($templateCache){
  $templateCache.put('test.html', 'Hello rrrr!');
 }]);


/**
 * @ngdoc controller
 * @name RoyApp.controller:MainCtrl
 * @requires ENUMS
 * @requires fetchDataService
 * @requires $scope
 * @requires $http
 * @param {string} rrr is awesome
 * @property {string} www is cool
 * @description
 * When called, it checks current 
 * {@link http://dev.w3.org/html5/spec/Overview.html#the-indicated-part-of-the-document Html5 spec}.
 */
  app.controller('MainCtrl', [ 'ENUMS', 'fetchDataService' , '$scope' , '$http', function (ENUMS, fetch, $scope , $http ) {

    $scope.catalogs           = ENUMS.Providers;
    $scope.currentCatalog     = {};
    $scope.categories         = {};
    $scope.currentCategory    = {};
    $scope.currentSub         = {};
    $scope.shopingCart        = [];
    $scope.totalCart          = 0;

/**
 * @ngdoc method
 * @name RoyApp.controller:MainCtrl#setCatalog
 * @param {object} catalog - contains the desire catalog to be shown
 * @methodOf RoyApp.controller:MainCtrl
 * @description
 * Populate the site with a specific catalog e.g. Movies/Dogs/Cloths..
 */
$scope.setCatalog = function (catalog) {
  console.log('$scope.setCatalog ', catalog  );
  fetch.async(catalog.data).then(function() {
    $scope.categories = fetch.data();
    $scope.currentCatalog  =  catalog;
    $scope.currentCategory    = {};
    $scope.currentSub         = {};
    console.table( $scope.categories);
  });
}
$scope.setCatalog(ENUMS.Providers.Movies); 
        

/**
 * @ngdoc method
 * @name RoyApp.controller:MainCtrl#setCurrentCategory
 * @param {object} category - contains the desire category within the catalog
 * @param {object} sub - [optional] define the sub category
 * @methodOf RoyApp.controller:MainCtrl
 * @description
 * Set the catalog to point for a specific category e.g. Movies/Dogs/Cloths..
 */  
$scope.setCurrentCategory = function (category , sub) {
  $scope.currentCategory = category;
  $scope.currentSub = sub || {};
}

/**
 * @ngdoc method
 * @name RoyApp.controller:MainCtrl#isSelected
 * @param {object} category - contains the desire category within the catalog
 * @methodOf RoyApp.controller:MainCtrl
 * @description
 * Check if the given category is selected
 */  
$scope.isSelected = function (category) {
  return $scope.currentCategory == category;
}

/**
 * @ngdoc method
 * @name RoyApp.controller:MainCtrl#addToCart
 * @param {object} product - a specific product item to be added into the shopping cart
 * @methodOf RoyApp.controller:MainCtrl
 * @description
 * Add a specific product item  into the shopping cart
 */  
$scope.addToCart = function(product) {
  var names=  $scope.shopingCart.map(function(d) {var tt= d['name'];return  tt;})
  var index = names.indexOf(product.name);
  if (index <0){
    var temp = angular.copy(product);
    temp.quantety = 1;
    $scope.shopingCart[$scope.shopingCart.length] = temp;
  }else{
    $scope.shopingCart[index].quantety++; 
  } 
  $scope.totalCart+= product.price;
}

/**
 * @ngdoc method
 * @name RoyApp.controller:MainCtrl#removeCart
 * @param {object} product - a specific product item to be removed from the shopping cart
 * @methodOf RoyApp.controller:MainCtrl
 * @description
 * Remove a specific product item   from the shopping cart
 */ 
$scope.removeCart = function(product) {
  var names =  $scope.shopingCart.map(function(d) {var tt= d['name'];return  tt;})
  var index = names.indexOf(product.name);
  if (index > -1){
    var amount = $scope.shopingCart[index].quantety * product.price;
    $scope.totalCart-= amount;
    $scope.shopingCart.splice( index , 1);
  } 
}
}]);

/**
 * @ngdoc filter
 * @name RoyApp.filter:orderObjectBy  
 * @function 
 * @description
 * Since orderBy filters are 'working' only on arrays, so I had to create a custom filter that will allow to work on an object
 * an will order the objects by its KEY
 * @example
   <example module="ngView">
    <file name="index.html">
          <div ng-repeat="student in university | filter:department" >
            <div><img ng-src="img/{{student.img}}"  ></div>
          </div>
    </file>
   </example>
 */
app.filter('orderObjectBy', function(){
 return function(input, attribute) {
  if (!angular.isObject(input)) return input;

  var array = [];
  for(var objectKey in input) {
    array.push(input[objectKey]);
  }

  array.sort(function(a, b){
    a = parseInt(a[attribute]);
    b = parseInt(b[attribute]);
    return a - b;
  });
  return array;
}
}); 


})();


(function () {
  'use strict';

  var app = angular.module('RoyApp', [ 'FactoriesModule'  ])
  app.controller('MainCtrl', [ 'ENUMS', 'fetchDataService' , '$scope' , '$http', function (ENUMS, fetch, $scope , $http ) {

    $scope.catalogs           = ENUMS.Providers;
    $scope.currentCatalog     = {};
    $scope.categories         = {};
    $scope.currentCategory    = {};
    $scope.currentSub         = {};
    $scope.shopingCart        = [];
    $scope.totalCart          = 0;

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

/*
            $scope.setCatalog = function (catalog) {
                console.log('$scope.setCatalog ', catalog  );
                fetch.async(catalog.data).then(function() {
                      $scope.currentCatalog  =  catalog;
                      console.table( $scope.currentCatalog);
                      $scope.$emit("myEvent", fetch.data());
                 });
            }
            $scope.setCatalog(ENUMS.Providers.Movies); 


            $scope.$on('myEvent', function (event, args) {
                    console.log('myEvent' , args);
                    $scope.categories =  args;
                    
             });

*/            
  
  $scope.setCurrentCategory = function (category , sub) {
  $scope.currentCategory = category;
  $scope.currentSub = sub || null;
}

$scope.isSelected = function (category) {
  return $scope.currentCategory == category;
}

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


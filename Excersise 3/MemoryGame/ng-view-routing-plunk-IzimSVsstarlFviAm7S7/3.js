
var sampleApp = angular.module('sampleApp', []);

sampleApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/AddNewOrder', {
	templateUrl: 'add_order.html',
	controller: 'AddOrderController'
      }).
      when('/ShowOrders', {
	templateUrl: 'show_orders.html',
	controller: 'ShowOrdersController'
      }).
      otherwise({
	redirectTo: '/AddNewOrder'
      });
}]);


sampleApp.controller('AddOrderController', function($scope) {
	
	$scope.message = 'This is Add new order screen';
	
});


sampleApp.controller('ShowOrdersController', function($scope) {

	$scope.message = 'This is Show orders screen';

});



var rrr = angular.module('rrr', []);

rrr.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/www', {
	templateUrl: 'add_order1.html',
	controller: 'AddOrderController'
      }).
      when('/eee', {
	templateUrl: 'show_orders1.html',
	controller: 'ShowOrdersController'
      }).
      otherwise({
	redirectTo: '/www'
      });
}]);


rrr.controller('AddOrderController', function($scope) {
	
	$scope.message = 'This is Add new order screen1111';
	
});


rrr.controller('ShowOrdersController', function($scope) {

	$scope.message = 'This is Show orders screen222';

});

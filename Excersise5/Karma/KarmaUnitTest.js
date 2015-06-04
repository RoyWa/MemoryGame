var app = angular.module('RoyApp', []);

app.controller('aaa', [ '$scope' ,'Fact1' , function ($scope, Fact1) {
	$scope.rrr = Fact1.method1();
}]);


app.factory('Fact1', function($http) {
    var factory = {}; 

    factory.users = ['John', 'James', 'Jake']; 
 
    factory.method1 = function() {
       console.log('Fact1 > method1');
       return 'Fact1 > method1';
     }
 
    factory.method2 = function() {
        console.log('Fact1 > method2');
        return 'Fact1 > method2';
     }
 
    return factory;
})

//TO run the below: "./node_modules/karma/bin/karma start ./node_modules/karma/bin/karma.conf.js"

describe('Unit: rrrrrrrrrrrrrrrrrr', function() {
  // Load the module with MainController
  beforeEach(module('RoyApp'));

  var ctrl, scope;
  // inject the $controller and $rootScope services
  // in the beforeEach block
  beforeEach(inject(function($controller, $rootScope) {
    console.log('dddsfsdfdsfdsfdsfdsfds');
    // Create a new scope that's a child of the $rootScope
    scope = $rootScope.$new();
    // Create the controller
    ctrl = $controller('aaa', {
      $scope: scope
    });
  }));

  it('should create $scope.greeting when calling sayHello', 
    function() {
       console.log('dddsfsdfdsfdsfdsfdsfds-'+scope.rrr); 
      //expect(scope.greeting).toBeUndefined();
      //scope.sayHello();
      //expect(scope.greeting).toEqual("Hello Ari");
  });

})
(function () {
  'use strict';

var app = angular.module('DirectivesModule', [ ]);

/**
    * @ngdoc directive 
    * @name DirectivesModule.directive:topHeader 
    * @restrict E 
    * @element <top-header></top-header>
    * @priority 1000 
    * @scope  true 
**/
app.directive("topHeader", function() {
    return {
        restrict: "E",
        transclude: true,
        scope: true, //true = meaning should act as a child scop with ref to the parent
        templateUrl: 'tmpl/header.html',
        link: function(scope) {
        }
    };
});

app.directive("navMenu", function() {
    return {
        restrict: "E",
        transclude: true,
        scope: true, //true = meaning should act as a child scop with ref to the parent
        templateUrl: 'tmpl/nav.html',
        link: function(scope) {
        }
    };
});

app.directive("workingArea", function() {
    return {
        restrict: "E",
        transclude: true,
        scope: true, //true = meaning should act as a child scop with ref to the parent
        templateUrl: 'tmpl/main.html',
        link: function(scope) {
        }
    };
});

app.directive("shoppingCart", function() {
    return {
        restrict: "E",
        transclude: true,
        scope: true, //true = meaning should act as a child scop with ref to the parent
        templateUrl: 'tmpl/shoppingcart.html',
        link: function(scope) {
        }
    };
});


})();
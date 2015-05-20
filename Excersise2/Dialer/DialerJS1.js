var app= angular.module("phoneApp", []);
app.controller("AppCtrl", function ($scope){
    $scope.selected = "";
	$scope.call= function( number){
	   $scope.selected +=number;
	}
});

app.directive("phone", function() {
	return{
		restrict:"E",
		scope:{
			number:"@",
			selected:"=",
			makeCall:"&"
		},
		transclude:true,
		replace:true,
		template: '<button type="button" class="btn btn-info customBtn" ng-click="makeCall({number: number})"><span ng-transclude></span>{{number}}</button>'
	};
});

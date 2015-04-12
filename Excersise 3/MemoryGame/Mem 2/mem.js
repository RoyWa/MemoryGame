var app= angular.module("memoryGameApp", ['ngAnimate']);
app.controller("AppCtrl", function ($scope){
		$scope.data = {};
    	$scope.data.cards = [
						{id:1 , name:'Jani',country:'Norway'},
						{id:2 , name:'Roy',country:'Israel'},
						{id:3 , name:'Hege',country:'Sweden'},
						{id:4 , name:'Dan',country:'Japan'},
						{id:2 , name:'Roy',country:'Israel'},
						{id:5 , name:'Kai',country:'Denmark'}];
		
		$scope.data.colors = tinycolor.analogous("steelblue", $scope.data.cards.length, $scope.data.cards.length);
		
		
		$scope.data.lastSelected = null;			
});

app.service('doAnimate', function($rootScope) {
	app = this;
	app.tt = function(){
		alert('doAnimate start' );
	}
	app.toggle = function(){
		alert('fave color: ' );
	}    
});

app.directive("card", ['doAnimate', function(doAnimate) {
  var controller = function ($scope) {
	$scope.showAnswer = false;
	$scope.validate = function(event , cardIndex){
		var elementContainer = event.currentTarget;
		var elementActual = event.target;
		console.log("validate start-" + cardIndex);
		console.log("validate lastSelected start-" + $scope.data.lastSelected);
		//doAnimate.tt();
		//elementContainer.addClass('answer'); 
		
		 if ($scope.data.cards[cardIndex].done) return;
		
		if (null === $scope.data.lastSelected){
			$scope.data.lastSelected = cardIndex;	
		}else if ($scope.data.cards[cardIndex].id === $scope.data.cards[$scope.data.lastSelected].id &&
				 cardIndex!=$scope.data.lastSelected){
			$scope.data.cards[cardIndex].done = true;
			$scope.data.cards[$scope.data.lastSelected].done = true;
			console.log("finished with one set of cards" + cardIndex);
		}else{
			
		}
		//$scope.lastSelected ++;
		console.log("validate lastSelected end-" + $scope.data.lastSelected);
		console.log($scope.data.cards);

		$scope.showAnswer = !$scope.showAnswer;
		
	};
  };

  
  return{
    restrict: 'E',
    scope: true,
    controller: controller
  }
}]);

app.animation('.answer-animation', function () {
  TweenLite.set('.cardWrapper', {perspective: 800});
  TweenLite.set('.card', {transformStyle: 'preserve-3d'});
  TweenLite.set('.back', {rotationY: -180});
  TweenLite.set(['.back', '.front'], {backfaceVisibility: 'hidden'});

  return {
    beforeAddClass: function (element, className, done) {
      if (className == 'answer') {
        TweenLite.to(element.find('.card'), 1.2,
          {rotationY:180, ease:Back.easeOut, onComplete:done});
      }
      else {
        done();
      }
    },

    beforeRemoveClass: function (element, className, done) {
      if (className == 'answer') {
        TweenLite.to(element.find('.card'), 1.2,
          {rotationY:0, ease:Back.easeOut, onComplete:done});
      }
      else {
        done();
      }
    }
  };
});
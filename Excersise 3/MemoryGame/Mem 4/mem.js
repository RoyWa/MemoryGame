
var app= angular.module("memoryGameApp", ['ngAnimate']);
app.controller("AppCtrl", function ($scope){
		$scope.data = {};
		$scope.data.lastSelectedIndex = null;
		$scope.data.lastSelectedScope = null;
		$scope.data.cards = [];		
		$scope.data.base = [
						{id:1 ,  name:'Jani'},
						{id:2 ,  name:'Roy'},
						{id:3 ,  name:'Hege'},
						{id:4 ,  name:'Dan'},
						{id:5 ,  name:'Guy'},
						{id:6 ,  name:'Kai'}];
						
		$scope.data.colors = tinycolor.analogous("steelblue", $scope.data.base.length+1, $scope.data.base.length+1);
		
		$scope.random = function(Max) {
			return Math.floor((Math.random() * Max) + 1);
		}

		angular.forEach($scope.data.base, function(value, key) {
			var len = ( $scope.data.base.length *	2) - 1; 
			value.random = $scope.random(len);
			value.colour = $scope.data.colors[key].toHexString();
			
			var value2 =angular.copy(value);
			value2.random = $scope.random(len);
			
			this.push(value);
			this.push(value2);			
		}, 	$scope.data.cards);	

		console.table($scope.data.cards);
});

app.factory('doAnimate', function() {
	TweenLite.set('.cardWrapper', {perspective: 800});
	TweenLite.set('.card', {transformStyle: 'preserve-3d'});
	TweenLite.set('.back', {rotationY: -180});
	TweenLite.set(['.back', '.front'], {backfaceVisibility: 'hidden'});
	return {
			toggle: function(element, showAnswer, done){
			  if ( showAnswer ) {
				TweenLite.to(element.find('.card'), 1.2, {rotationY:180, ease:Back.easeOut, onComplete:done});
			  }
			  else {
				TweenLite.to(element.find('.card'), 1.2, {rotationY:0, ease:Back.easeOut, onComplete:done});       
			  }
			}
	}
});

app.directive("card", ['$timeout', function($timeout) {
  var controller = function ($scope) {
	$scope.showAnswer = false;
	$scope.isDisabled = false;
	$scope.validate = function(event , cardIndex, cardID){
		console.log(" ############### directive/card/validate()-> start on index["+cardIndex+"] , lastSelectedIndex["+$scope.data.lastSelectedIndex+"] ############### ");
		var elementContainer = event.currentTarget;
		var element  = $(elementContainer);
		
		if ($scope.data.cards[cardIndex].done) {
			console.log("directive/card/validate()-> Stop in case it was clicked on a solved pair of cards ");
			return;
		}
		
		if (null === $scope.data.lastSelectedIndex){
			console.log("directive/card/validate()-> Handle first time clicked on any card");
			$scope.data.lastSelectedIndex = cardIndex;	
			$scope.data.lastSelectedScope	= $scope;
		}else if ($scope.data.cards[cardIndex].id === $scope.data.cards[$scope.data.lastSelectedIndex].id && cardIndex!=$scope.data.lastSelectedIndex){
			console.log("directive/card/validate()->Handle on success of discovering a pair of two same cards, mark them as done");
			$scope.data.cards[cardIndex].done = true;
			$scope.data.cards[$scope.data.lastSelectedIndex].done = true;
			$scope.isDisabled = true;
			$scope.data.lastSelectedIndex = null;
			$scope.data.lastSelectedScope	= null;			
		}else{
			console.log("directive/card/validate()-> Handle wrong selection of a pair of cards, reset selection & flip back the cards");
			$timeout(function() {
				console.log("directive/card/validate() -> onDemand hide both answers with timeout fired- ");
				if ($scope.data.lastSelectedScope!=null) $scope.data.lastSelectedScope.showAnswer = false;				
				$scope.showAnswer = false;		
				
				//Reset settings
				$scope.data.lastSelectedIndex = null;
				$scope.data.lastSelectedScope = null;		
			}, 1000);
					
		}
				
		$scope.showAnswer = !$scope.showAnswer;
		console.table($scope.data.cards);
		console.log(" ############### directive/card/validate() -> end ############### " );
	};
  };

  return{
    restrict: 'E',
    scope: true,
    controller: controller
  }
}]);

app.animation('.answer-animation', ['doAnimate',function (doAnimate) {
  return {
    beforeAddClass: function (element, className, done) {
      if (className == 'answer') {
		doAnimate.toggle(element, true, done);
      }
      else {
        done();
      }
    },

    beforeRemoveClass: function (element, className, done) {
      if (className == 'answer') {
		doAnimate.toggle(element, false, done);
      }
      else {
        done();
      }
    }
  };
}]);
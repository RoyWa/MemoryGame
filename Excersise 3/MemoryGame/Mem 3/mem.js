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
		
		
		$scope.data.lastSelectedIndex = null;
		$scope.data.lastSelectedElement = null;
});

app.service('doAnimate', function($rootScope) {
	app = this;
	TweenLite.set('.cardWrapper', {perspective: 800});
	TweenLite.set('.card', {transformStyle: 'preserve-3d'});
	TweenLite.set('.back', {rotationY: -180});
	TweenLite.set(['.back', '.front'], {backfaceVisibility: 'hidden'});
	
	app.toggle = function(element, showAnswer, done){
      if ( showAnswer ) {
        TweenLite.to(element.find('.card'), 1.2, {rotationY:180, ease:Back.easeOut, onComplete:done});
      }
      else {
		TweenLite.to(element.find('.card'), 1.2, {rotationY:0, ease:Back.easeOut, onComplete:done});       
      }
	}    
});

app.directive("card", ['$timeout', 'doAnimate', function($timeout, doAnimate) {
  var controller = function ($scope) {
	$scope.showAnswer = false;
	$scope.validate = function(event , cardIndex){
		console.log("directive/card/validate()-> start on index["+cardIndex+"] , lastSelectedIndex["+$scope.data.lastSelectedIndex+"]");
		var elementContainer = event.currentTarget;
		var element  = $(elementContainer);
		//var elementTarget = event.target;
		//$(elementContainer).addClass('answer'); //.hasClass( "answer" )
		
		if ($scope.data.cards[cardIndex].done) {
			console.log("directive/card/validate()-> Stop in case it was clicked on a solved pair of cards ");
			return;
		}
		
		if (null === $scope.data.lastSelectedIndex){
			console.log("directive/card/validate()-> Handle first time clicked on any card" +element.hasClass('answer'));
			$scope.data.lastSelectedIndex = cardIndex;	
			$scope.data.lastSelectedElement	= $scope;
		}else if ($scope.data.cards[cardIndex].id === $scope.data.cards[$scope.data.lastSelectedIndex].id && cardIndex!=$scope.data.lastSelectedIndex){
			console.log("directive/card/validate()->Handle on success of discovering a pair of two same cards, mark them as done");
			$scope.data.cards[cardIndex].done = true;
			$scope.data.cards[$scope.data.lastSelectedIndex].done = true;
		}else{
			console.log("directive/card/validate()-> Handle wrong selection of a pair of cards, reset selection & flip back the cards");
			$timeout(function() {
				// false true
				// false false
				$scope.data.lastSelectedIndex = null;
				//doAnimate.toggle($scope.data.lastSelectedElement, false, function(){ console.log("Done -doAnimate.toggle()-> onDemand hide answer");});	
				$scope.data.lastSelectedElement.showAnswer = false;
				
			
				//doAnimate.toggle(element, false, function(){ console.log("doAnimate.toggle()-> onDemand hide answer with timeout fired");});
				//element.removeClass('answer');
				$scope.showAnswer = false;
			console.log("doAnimate.toggle()-> onDemand hide answer with timeout fired- ");
			$scope.data.lastSelectedElement	= $scope;
				
			}, 1000);
					
		}
		
		
		$scope.showAnswer = !$scope.showAnswer;
		console.log("validate lastSelectedIndex end-" + $scope.data.lastSelectedIndex);
		console.table($scope.data.cards);
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
var app= angular.module("memoryGameApp", ['ngAnimate']);

app.controller("AppCtrl", ['$scope', 'ENUMS', 'FactoryCards', function ($scope, ENUMS ,FactoryCards){
		$scope.data = {};
		$scope.data.lastSelectedIndex = null;
		$scope.data.lastSelectedScope = null;

		$scope.menu = [
			{id:1 ,title: 'מיספרים'},
			{id:2 ,title: 'צבעים'},
			{id:3 ,title: 'שמות'},
			{id:4 ,title: 'תמונות'}
		];

		var provider = new FactoryCards( ENUMS.Providers.Numbers);
		$scope.data.cards = provider.getData();		
		console.table($scope.data.cards);
}]);

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
			},
			highlight: function(element, isSelected, done){
			  if ( isSelected ) {
				TweenLite.to(element, 0.2, {width: '130', color: '#89CD25', borderLeft: '20px solid #89CD25', onComplete: done });
			  }
			  else {
				TweenLite.to(element, 0.4, {width: '120', color: '#CCC',   borderLeft: '10px solid #333',  onComplete: done });
			  }
			}
	}
});

app.directive('menuItem', function () {
  var controller = function ($scope) {
    $scope.active = false;
	$scope.changeGame = function(menu){
		console.log('menuItem', menu);
	};
  };

  return {
    scope: true,
    controller: controller
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

app.animation('.menu-animation', ['doAnimate',function (doAnimate) {
  return {
    beforeAddClass: function (element, className, done) {
	  console.log(" ############### menu-animation selected ############### " );	
      if (className == 'highlight') {
		doAnimate.highlight(element, true, done);
      }
      else {
        done();
      }
    },

    beforeRemoveClass: function (element, className, done) {
	 console.log(" ############### menu-animation de selected ############### " );	
      if (className == 'highlight') {
		doAnimate.highlight(element, false, done);
      }
      else {
        done();
      }
    }
  };
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
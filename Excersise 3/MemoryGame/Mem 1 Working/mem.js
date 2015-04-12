var app= angular.module("memoryGameApp", ['ngAnimate']);
app.controller("AppCtrl", function ($scope){
    	$scope.cards = [
						{name:'Jani',country:'Norway'},
						{name:'Roy',country:'Israel'},
						{name:'Hege',country:'Sweden'},
						{name:'Dan',country:'Japan'},
						{name:'Kai',country:'Denmark'}];
});

app.directive("card", function() {
  var controller = function ($scope) {
	$scope.showAnswer = false;
  };

  return {
    restrict: 'E',
    scope: true,
    controller: controller
  }
});

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
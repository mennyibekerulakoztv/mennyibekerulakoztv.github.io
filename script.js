
//http://jsfiddle.net/wesleyhales/59SeE/light/
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function(callback,element){
      window.setTimeout(callback, 1000 / 60);
    };
})();

angular.module('app',[])
.controller('Counter',function($scope){
	var pricePerYear = 80 * 1000000000;

	var pricePerSec = pricePerYear / 365 / 24 / 60 / 60;
	$scope.startTime = new Date();
	$scope.moneySpent = 0;
	var refreshMoneySpent = function(){
		$scope.$apply(function(){
			$scope.moneySpent = ((new Date()).getTime() - $scope.startTime.getTime()) / 1000 * pricePerSec;
		});
		requestAnimFrame(refreshMoneySpent);
	};
	requestAnimFrame(refreshMoneySpent);
})
.filter('formatLocalCurrency', function($filter) {
  return function(input) {
    return $filter('number')(input, 0).replace(/,/g ,' ');
  };
});
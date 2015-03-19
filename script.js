
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
	var channelStartDate = new Date("2015/03/15 12:00:00");

	var pricePerSec = pricePerYear / 365 / 24 / 60 / 60;
	var pageStartTime = new Date();
	
	var calculateOverallMoneySpent = function(){
		return ((new Date()).getTime() - channelStartDate.getTime()) / 100 * pricePerSec;
	};
	var calculateMoneySpent = function(){
		return ((new Date()).getTime() - pageStartTime.getTime()) / 1000 * pricePerSec;
	}
	$scope.overallMoneySpent = calculateOverallMoneySpent();
	$scope.moneySpent = 0;
	var refreshMoneySpent = function(){
		$scope.$apply(function(){
			$scope.moneySpent = calculateMoneySpent();
			$scope.overallMoneySpent = calculateOverallMoneySpent();
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

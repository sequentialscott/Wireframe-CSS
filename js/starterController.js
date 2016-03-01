(function(){

angular.module("myApp", ["wfDirectives"]);

angular.controller("myAppCtrl", ctrl);

// If you need to inject $scope or other services into the controller...
// ctrl.$inject = (['$scope', 'a', 'b', 'c']);
// function ctrl($scope, a, b, c) { ... };


function ctrl() {
	var vm = this;
	
	// Rest of controller code goes here
	// For more on this syntax and approach, see https://github.com/johnpapa/angular-styleguide#controllers
	
};

})();
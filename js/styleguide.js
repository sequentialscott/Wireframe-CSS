/* Contents for the style guide */
var styles = [
    { title: "Buttons", id: "buttons" },
    { title: "Expand & Collapse", id: "collapse" },
	{ title: "Forms", id: "formLayout" },
    { title: "Loading Indicator", id: "loading" },
	{ title: "Tables", id: "tables" }, 
    { title: "Text Styles", id: "textStyles" },
	{ title: "User Messages", id: "userMessages" }
];


/* Angular module and controller for style guide */
var styleguide = angular.module('styleguide', ['wfDirectives']);

styleguide.controller('styleCtrl', ['$scope', '$anchorScroll', '$location', function ($scope, $anchorScroll, $location) {
    $scope.styles = styles;

    /* Initialize default page settings */
    $scope.buttonAlign = "center";
    $scope.collapseDefault = "open";
	$scope.tablesCompact = false;
    $scope.textStyle = "instructions";
	$scope.textStyleCompact = false;
    $scope.userMessageCallback = false;
    $scope.userMessageCompact = false;
    $scope.userMessageDismiss = true;
    $scope.userMessageType = "success";
	$scope.userMessageVisible = { show: true };

    /* Utility functions */
    $scope.scrollTo = function (id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        //reset to old to keep any additional routing logic from kicking in
        $location.hash(old);
    };

} ]);
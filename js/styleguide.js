/* Contents for the style guide */
var styles = [
    { title: "Buttons", id: "buttons" },
    { title: "Expand & Collapse", id: "collapse" },
	{ title: "Forms", id: "formLayout" },
    { title: "Loading Indicator", id: "loading" },
	{ title: "Panels", id: "panels" }, 
	{ title: "Tables", id: "tables" }, 
    { title: "Text Styles", id: "textStyles" },
	{ title: "User Messages", id: "userMessages" }
];
var colors = ["aliceblue", "antiquewhite", "azure", "beige", "bisque", "blanchedalmond", "burlywood", "cornsilk", "floralwhite", "gainsboro", "ghostwhite", "honeydew", "ivory", "khaki", "lavender", "lavenderblush", "lemonchiffon", "lightcyan", "lightgray", "lightgrey", "lightyellow", "linen", "mintcream", "mistyrose", "mocassin", "oldlace", "palegoldenrod", "papayawhip", "peachpuff", "powderblue", "rebeccapurple", "seashell", "silver", "thistle", "tomato", "wheat", "whitesmoke"]

/* Angular module and controller for style guide */
var styleguide = angular.module('styleguide', ['wfDirectives']);

styleguide.controller('styleCtrl', ['$scope', '$anchorScroll', '$location', function ($scope, $anchorScroll, $location) {
    $scope.styles = styles;
	$scope.colors = colors;

    /* Initialize default page settings */
	$scope.buttons = { 
		alignment: "center",
		compact: false
	};
    $scope.collapse = { 
		defaultCollapse: "open",
		headingLevel: "4",
		hideIndicator: false
	};
	$scope.panels = {
		bodyColor: '',
		footerColor: '',
		headingColor: '',
		showHeading: true,
		showFooter: false
	};
	$scope.tables = {
		compact: false,
		showSort: true,
		sortDirection: "ascending",
		toggleSort: function(){
			this.sortDirection = this.sortDirection === "ascending" ? "descending" : "ascending";
		}
	};
	$scope.textStyles = {
		compact: false,
		style: "instructions",
	};
	$scope.userMessage = {
		callback: false,
		compact: false,
		dismiss: true,
		type: "success",
		visible: true
	};
	
    $scope.scrollTo = function (id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        //reset to old to keep any additional routing logic from kicking in
        $location.hash(old);
    };

} ]);
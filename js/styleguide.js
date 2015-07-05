/* Contents for the style guide */
var styles = [
    { title: "Buttons", id: "buttons" },
    { title: "Expand & Collapse", id: "collapse" },
	{ title: "Forms", id: "formLayout" },
	{ title: "Icons", id: "icons" },
    { title: "Loading Indicator", id: "loading" },
	{ title: "Panels", id: "panels" }, 
	{ title: "Tables", id: "tables" }, 
    { title: "Text Styles", id: "textStyles" },
	{ title: "User Messages", id: "userMessages" }
];
var colors = ["aliceblue", "antiquewhite", "azure", "beige", "bisque", "blanchedalmond", "burlywood", "cornsilk", "floralwhite", "gainsboro", "ghostwhite", "honeydew", "ivory", "khaki", "lavender", "lavenderblush", "lemonchiffon", "lightcyan", "lightgray", "lightgrey", "lightyellow", "linen", "mintcream", "mistyrose", "mocassin", "oldlace", "palegoldenrod", "papayawhip", "peachpuff", "powderblue", "rebeccapurple", "seashell", "silver", "thistle", "tomato", "wheat", "whitesmoke"]
var icons = ["add", "arrowdown", "arrowright", "arrow", "attachment", "closed", "document", "doubledown", "doubleright", "download", "edit", "ellipsis", "error", "info", "minus", "ok", "open", "options", "plus", "reload", "upload", "warning"];



/* Angular module and controller for style guide */
var styleguide = angular.module('styleguide', ['wfDirectives']);

styleguide.controller('styleCtrl', ['$scope', '$anchorScroll', '$location', function ($scope, $anchorScroll, $location) {
    $scope.styles = styles;
	$scope.colors = colors;

    /* Initialize default page settings */
	$scope.buttons = { 
		alignment: "center",
		compact: false,
		drawn: false
	};
    $scope.collapse = { 
		defaultCollapse: "open",
		headingLevel: "4",
		hideIndicator: false
	};
	$scope.forms = {
		handDrawn: true
	};
	$scope.icons = {
		compact: false,
		icon: "ok",
		iconSet: icons
	};
	$scope.panels = {
		bodyColor: '',
		footerColor: '',
		handDrawn: true,
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
	$scope.userMessages = {
		callback: false,	// Why isn't this in the config object?  Because it's a Boolean bound to a checkbox and not an actual callback function.
		config: {
			compact: false,			// Set to true to make message use compact styles.
			dismiss: true,			// Set to false if message shouldn't be dismissable.
			onDismiss: function(){alert("Message dismissed.");},	// Callback function to run when message is dimsissed.
			type: "success",
			visible: true,		
		},
		angularDirective: true
	};
	
    $scope.scrollTo = function (id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        //reset to old to keep any additional routing logic from kicking in
        $location.hash(old);
    };

} ]);


// Conditional comments not supported in IE10 without changing DOCTYPE to force quirks.
// So we'll do some feature detection instead. Will handle the hand-drawn borders.
if (/*@cc_on!@*/false)
	document.documentElement.className += ' lte10';
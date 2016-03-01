(function(){

/* Contents for the style guide */
var styles = [
    { title: "Buttons", id: "buttons" },
    { title: "Expand & Collapse", id: "collapse" },
	{ title: "Forms", id: "formLayout" },
    { title: "Grid & Layout", id: "grid" },
	{ title: "Icons", id: "icons" },
    { title: "Loading Indicator", id: "loading" },
	{ title: "Modal Dialog", id: "modal" }, 
	{ title: "Panels", id: "panels" }, 
	{ title: "Tables", id: "tables" }, 
	{ title: "Tabs", id: "tabs" },
    { title: "Text Styles", id: "textStyles" },
	{ title: "Tooltips", id: "tooltips" },
	{ title: "User Messages", id: "userMessages" }
];
var colors = ["aliceblue", "antiquewhite", "azure", "beige", "bisque", "blanchedalmond", "burlywood", "cornsilk", "floralwhite", "gainsboro", "ghostwhite", "honeydew", "ivory", "khaki", "lavender", "lavenderblush", "lemonchiffon", "lightcyan", "lightgray", "lightgrey", "lightyellow", "linen", "mintcream", "mistyrose", "mocassin", "oldlace", "palegoldenrod", "papayawhip", "peachpuff", "powderblue", "rebeccapurple", "seashell", "silver", "thistle", "tomato", "wheat", "whitesmoke"];
var icons = ["add", "arrowdown", "arrowright", "arrow", "attachment", "closed", "document", "doubledown", "doubleright", "download", "edit", "ellipsis", "error", "info", "minus", "ok", "open", "options", "plus", "reload", "upload", "warning"];



/* Angular module and controller for style guide */
var styleguide = angular.module('styleguide', ['wfDirectives']);
styleguide.controller('styleCtrl', ['$scope', '$anchorScroll', '$location', styleCtrl]);

function styleCtrl ($scope, $anchorScroll, $location) {
	var vm = this;
    vm.styles = styles;
	vm.colors = colors;

    /* Initialize default page settings */
	vm.buttons = { 
		alignment: "center",
		compact: false,
		drawn: false
	};
    vm.collapse = { 
		defaultCollapse: "open",
		headingLevel: "4",
		hideIndicator: false
	};
	vm.forms = {
		handDrawn: true
	};
    vm.grid={
        panelA: 4,
        panelB: 8,
        calculatePanelB: function(){
            return 12 - this.panelA;
        }
    };
	vm.icons = {
		compact: false,
		icon: "ok",
		iconSet: icons
	};
	vm.modal = {
		show: false
	};
	vm.panels = {
		bodyColor: '',
		footerColor: '',
		handDrawn: true,
		headingColor: '',
		showHeading: true,
		showFooter: false
	};
	vm.tables = {
		compact: false,
		showSort: true,
		sortDirection: "ascending",
		toggleSort: function(){
			this.sortDirection = this.sortDirection === "ascending" ? "descending" : "ascending";
		}
	};
	vm.tabs = {
		code: 'angular'
	};
	vm.textStyles = {
		compact: false,
		style: "instructions"
	};
	vm.tooltips = {
		position: "bottom",
		clickTrigger: false
	};
	vm.userMessages = {
		callback: false,	// Why isn't this in the config object?  Because it's a Boolean bound to a checkbox and not an actual callback function.
		config: {
			compact: false,			// Set to true to make message use compact styles.
			dismiss: true,			// Set to false if message shouldn't be dismissable.
			onDismiss: function(){alert("Message dismissed.");},	// Callback function to run when message is dimsissed.
			type: "success",
			visible: true
		},
		angularDirective: true
	};
	
    vm.scrollTo = function (id) {
        var old = $location.hash();
        $location.hash(id);
        $anchorScroll();
        //reset to old to keep any additional routing logic from kicking in
        $location.hash(old);
    };
};


// Conditional comments not supported in IE10 without changing DOCTYPE to force quirks.
// So we'll do some feature detection instead. Will handle the hand-drawn borders.
if (/*@cc_on!@*/false)
	document.documentElement.className += ' lte10';
	
})();
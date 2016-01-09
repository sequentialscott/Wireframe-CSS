angular.module('wfDirectives', []);
/* This module contains the Angular directives available across the site.
     In the application to use them, make sure that "wfDirectives" is injected, like so:

     angular.module('appName', ["wfDirectives"]);

     Include this file after the angular.js file. */

/* -------------------------- USER MESSAGES ---------------------------- */
// The user message directive takes a single attribute, which should point to a configuration object in the controller.  If the controller
// updates a value in the object, the 2-way binding will update inside the directive.  The configuration object should have these key/value pairs:
// compact: Boolean. Tells directive to use compact styles if true.
// dismiss: Boolean. Set to false if you don't want to let users dismiss the message.  Otherwise it is dismissable.
// onDismiss: Function. This function runs when users dismiss the message.
// type: String. The class name of the message type (error, warning, success, info, no-data, loading).
// visible: Boolean. True shows the message, and false hides the message.
angular.module('wfDirectives').directive('wfMessage', function () {
    return {
        restrict: 'AE',
        scope: {
			config: '=',	// Object in controller that has the settings for the message.
        },
        replace: true,
        transclude: true,
        template: 
			'<p class="message {{ config.type }}" data-ng-show="config.visible">' + 
				'<span class="closeIcon iconX secondary compact" data-ng-if="config.dismiss" data-ng-click="dismiss()"></span>' + 
				'<span class="icon" data-ng-class="{ ' +
					'ok: config.type === \'success\',' + 
					'error: config.type===\'error\',' +
					'warning: config.type === \'warning\',' +
					'ellipsis: config.type === \'no-data\',' +
					'info: config.type === \'info\',' + 
					'compact: config.compact' +
				'}"></span>' +
				'<span ng-transclude></span>' + 
			'</p>',
        link: function (scope, element, attrs) {
			scope.$watch('config.compact', function(){
				if (scope.config.compact) {
					element.addClass('compact');
				} else {
					element.removeClass('compact');
				};
			});
			
            // Dismissing
			scope.dismiss = function(){
				if (scope.config.onDismiss) scope.config.onDismiss();
				scope.config.visible = false;
			};

        }
    };
});


/* --------------------------- EXPAND & COLLAPSE ------------------------------- */
// Depends on the data-forid attribute to point to the element to be toggled. Syntax is:
// <div class="collapse-toggle" coc-utilities data-forid="target-id"></div>
angular.module('wfDirectives').directive('wfCollapse', function () {
    return {
		restrict: 'AE',
		transclude: true,
		replace: true,
		scope: { 
			headingLevel: '=',
			hideIndicator: '='
		},
		template: 
			'<div style="position:relative">' +
				'<span class="collapse-toggle icon open compact" data-ng-click="toggle()" data-ng-show="!hideIndicator && expanded"}"></span>' +
				'<span class="collapse-toggle icon closed compact" data-ng-click="toggle()" data-ng-show="!hideIndicator && !expanded"></span>' +
				'<div class="collapse-area">' +
					'<span data-ng-if="headingText">' +
						'<h1 data-ng-click="toggle()" data-ng-show="headingLevel===\'1\'">{{ headingText }}</h1>' +
						'<h2 data-ng-click="toggle()" data-ng-show="headingLevel===\'2\'">{{ headingText }}</h2>' +
						'<h3 data-ng-click="toggle()" data-ng-show="headingLevel===\'3\'">{{ headingText }}</h3>' +
						'<h4 data-ng-click="toggle()" data-ng-show="headingLevel===\'4\'">{{ headingText }}</h4>' +
						'<h5 data-ng-click="toggle()" data-ng-show="headingLevel===\'5\'">{{ headingText }}</h5>' +
						'<h6 data-ng-click="toggle()" data-ng-show="headingLevel===\'6\'">{{ headingText }}</h6>' +
						'<div data-ng-click="toggle()" data-ng-show="headingLevel===\'div\'">{{ headingText }}</div>' + 	
					'</span>' +
					'<div data-ng-show="expanded">' +
						'<div data-ng-transclude></div>' +
					'</div>' +
				'</div>' +
			'</div>',
        link: function (scope, element, attrs) {
			scope.headingText = attrs.headingText;
			scope.expanded = !('closed' in attrs);
			scope.toggle = function(){
				scope.expanded = !scope.expanded;
			};

        }
    };
});



/* -------------------- LOADING INDICATOR ------------------------------------ */
angular.module('wfDirectives').directive('wfLoading', function () {
    return {
        restrict: 'AE',
        replace: 'true',
        template: '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>'
    }
});


/* -------------------- MODAL DIALOG ----------------------------------------- */
// Shows based on a Boolean variable in the controller's scope.
// From: https://github.com/adamalbrecht/ngModal
angular.module('wfDirectives').directive('wfModal', function () {
    return {
        restrict: 'AE',
        scope: {
            show: '=',
            title: '@',
            onClose: '&?'
        },
        replace: true,
        transclude: true,
        template: 
			"<div class='wf-modal' ng-show='show'>" + 
				"<div class='wf-modal-overlay' ng-click='hideModal()'></div>" + 
					"<div class='wf-modal-dialog' ng-style='dialogStyle'>" + 
						"<span class='wf-modal-title' ng-show='title && title.length' ng-bind='title'></span>" + 
						"<div class='wf-modal-close' ng-click='hideModal()'>" + 
							"<div><span class='icon error compact'></span></div>" + 
						"</div>" + 
						"<div class='wf-modal-dialog-content' ng-transclude></div>" + 
				"</div>" + 
			"</div>",
		link: function (scope, element, attrs) {
            var setupStyle;

            setupStyle = function () {
                scope.dialogStyle = {};
                if (attrs.width) {
                    scope.dialogStyle['width'] = attrs.width;
                };
                if (attrs.height) {
                    scope.dialogStyle['height'] = attrs.height;
                }
                return scope.dialogStyle;
            };

            scope.hideModal = function () {
                scope.show = false;
                if (scope.onClose) scope.onClose();
            };

            scope.$watch('show', function (newVal, oldVal) {
                if (newVal && !oldVal) {
                    document.getElementsByTagName("body")[0].style.overflow = "hidden";
                } else {
                    document.getElementsByTagName("body")[0].style.overflow = "";
                };
            });

            setupStyle();
        }
    };
});


/* -------------------- TABS --------------------------------------------------- */
angular.module('wfDirectives').directive('wfTabset', function(){
	var tabsetCtrl = function(){
		var self = this;
		self.tabs = [];
		self.select = function(selectedTab) {
			angular.forEach(self.tabs, function(tab){
				if (tab.active && tab !== selectedTab) {
					tab.active = false;
				};
			});
			selectedTab.active = true;
		};
		self.registerTab = function(tab) {
			self.tabs.push(tab);
			if (self.tabs.length === 1) {
				tab.active = true
			};
		};
	};
	var tabsetTemplate = 
	"<div class='tabset'>" +
		"<ul>" +
			"<li data-ng-repeat='tab in tabset.tabs' data-ng-click='tabset.select(tab)' data-ng-class='{active: tab.active}'>{{ tab.tabTitle }}</li>" +
		"</ul>" +
		
		"<div data-ng-transclude></div>" +
	"</div>";
	
	return {
		restrict: 'AE',
		transclude: true,
		scope: {},
		template: tabsetTemplate,
		controllerAs: 'tabset',
		bindToController: true,
		controller: tabsetCtrl
	};
});
angular.module('wfDirectives').directive('wfTab', function(){
	var tabLinking = function(scope, element, attrs, tabsetCtrl){
		scope.active = false;
		tabsetCtrl.registerTab(scope);
	};
	var tabTemplate = 
	"<div class='tab' data-ng-show='active'>" +
		"<div data-ng-transclude></div>" +
	"</div>";

	return {
		restrict: "AE",
		require: "^wfTabset",
		replace: true,
		transclude: true,
		scope: {
			tabTitle: '@'
		},
		template: tabTemplate,
		link: tabLinking
	};
});
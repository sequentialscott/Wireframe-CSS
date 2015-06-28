angular.module('wfDirectives', []);
/* This module contains the Angular directives available across the site.
     In the application to use them, make sure that "wfDirectives" is injected, like so:

     angular.module('appName', ["wfDirectives"]);

     Include this file after the angular.js file. */

/* -------------------------- USER MESSAGES ---------------------------- */
// Use this for user messages on Angular pages that required animation or dismiss options.
// message-class: String with the class name saying what kind of message it is (success, error, etc.).  Can also be done in regular class attribute.
// dismissable: Set this attribute to false if you don't want to let users dismiss the message.  Otherwise it is dismissable.
// highlight: Include to animate the message's display with a color that fades out.  No value required.
// time-to-show: Number of milliseconds to display the message before it fades out on its own.
// on-dismiss: Callback function to be executed when dismissing the message.  Often used to reset the show message flag in the controller.
angular.module('wfDirectives').directive('wfMessage', function () {
    return {
        restrict: 'AE',
        scope: {
			visible: '=',			// Object from controller with Boolean to control visibility
            onDismiss: '&',         // Function to call on dismissal
            msgType: '=',  			// To monitor the type of message (success, warning, etc.) and update it if it changes.
			dismissable: '='		// Show or hide the icon to dismiss the message
        },
        replace: true,
        transclude: true,
        template: 
			'<p class="message {{ msgType }}" data-ng-show="visible">' + 
				'<span class="closeIcon iconX secondary compact" data-ng-if="dismissable" data-ng-click="dismiss()"></span>' + 
				'<span class="icon" data-ng-class="{ ' +
					'ok: msgType === \'success\',' + 
					'error: msgType===\'error\',' +
					'warning: msgType === \'warning\',' +
					'ellipsis: msgType === \'no-data\',' +
					'info: msgType === \'info\',' + 
					'compact: iconCompact' +
				'}"></span>' +
				'<span ng-transclude></span>' + 
			'</p>',
        link: function (scope, element, attrs) {
			scope.$watch(function() {return element.attr('class'); }, function(newValue){
				scope.iconCompact = element.hasClass('compact');
			});
			//scope.isCompact = function() {
			//	return element.hasClass('compact');
			//};
			//scope.classList = attrs.class;
			//scope.$watch('classList', function(){
			//	scope.iconCompact = scope.isCompact();
			//});
			//scope.iconCompact = isCompact();
			//attrs.$observe('class', function(){
			//	scope.iconCompact = isCompact();
			//});
			
            // Dismissing
			scope.dismiss = function(){
				if (scope.onDismiss) scope.onDismiss();
				scope.visible = false;
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

'use strict';

/**
 * @ngdoc directive
 * @name parseCmsApp.directive:isActiveNav
 * @description
 * # isActiveNav
 */
angular.module('parseCmsApp')
	.directive('isActiveNav', ['$location', function($location) {
		return {
		  restrict: 'A', 
		  replace: false,
		  link: function(scope, elem) {
		      scope.$on("$routeChangeSuccess", function () {
		          var selectors = ['li > [href="#' + $location.path().match(/^(\/)([a-zA-Z0-9_-])*/igm) + '"]',
		                           'li > [href="/#' + $location.path().match(/^(\/)([a-zA-Z0-9_-])*/igm) + '"]', //html5: false
		                           'li > [href="' + $location.path().match(/^(\/)([a-zA-Z0-9_-])*/igm) + '"]']; //html5: true
		          $(elem).find(selectors.join(',')) //find the matching link
		          .parent('li').addClass('active') //add active class to the matching element
		          .siblings('li').removeClass('active'); //remove it from the sibling elements
		      });    
		   }
		}
	}]);
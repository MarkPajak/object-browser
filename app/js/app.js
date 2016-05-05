'use strict';

/* App Module */
var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);

var museum_objectcatApp = angular.module('museum_objectcatApp', [
		'ngRoute',
		'museum_objectcatAnimations',
		'museum_objectcatControllers',
		'museum_objectcatFilters',
		'museum_objectcatServices',
		'angularUtils.directives.dirPagination',
		"ngSanitize",
		"com.2fdevs.videogular",
		"com.2fdevs.videogular.plugins.controls",
		"com.2fdevs.videogular.plugins.overlayplay",
		"com.2fdevs.videogular.plugins.poster",
		"com.2fdevs.videogular.plugins.buffering",
		'underscore',
		'ngScrollbar',
]) 

museum_objectcatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/museum_object-list.html',
        controller: 'museum_objectListCtrl'
      }).
	  when('/slideshow/index/:index', {
        templateUrl: 'partials/slideshow.html',
        controller: 'slideshowCtrl'
      }).
	  when('/slideshow/:filter', {
        templateUrl: 'partials/slideshow.html',
        controller: 'slideshowCtrl'
      }).
	  when('/slideshow/ids/:ids', {
        templateUrl: 'partials/slideshow.html',
        controller: 'slideshowCtrl'
      }).
	  when('/slideshow', {
        templateUrl: 'partials/slideshow.html',
        controller: 'slideshowCtrl'
      }).
      when('/id/:museum_objectId/:link', {
        templateUrl: 'partials/museum_object-detail.html',
        controller: 'museum_objectDetailCtrl'
      }).
	  when('/id/:museum_objectId', {
        templateUrl: 'partials/museum_object-detail.html',
        controller: 'museum_objectDetailCtrl'
      }).
	    when('/id/:museum_objectId', {
        templateUrl: 'partials/museum_object-detail.html',
        controller: 'museum_objectDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

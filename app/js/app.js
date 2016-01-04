'use strict';

/* App Module */

var museum_objectcatApp = angular.module('museum_objectcatApp', [
  'ngRoute',
  'museum_objectcatAnimations',
  'museum_objectcatControllers',
  'museum_objectcatFilters',
  'museum_objectcatServices',
  'angularUtils.directives.dirPagination'
]);

museum_objectcatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/museum_object-list.html',
        controller: 'museum_objectListCtrl'
      }).
      when('/id/:museum_objectId', {
        templateUrl: 'partials/museum_object-detail.html',
        controller: 'museum_objectDetailCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);

'use strict';

/* App Module */

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
	"com.2fdevs.videogular.plugins.poster"
]).controller('HomeCtrl',
		["$sce", function ($sce) {
			this.config = {
				sources: [
					{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
					{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
					{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
				],
				tracks: [
					{
						src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
						kind: "subtitles",
						srclang: "en",
						label: "English",
						default: ""
					}
				],
				theme: "bower_components/videogular-themes-default/videogular.css",
				plugins: {
					poster: "http://www.videogular.com/assets/images/videogular.png"
				}
			};
		}]
	);

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

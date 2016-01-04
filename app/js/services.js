'use strict';

/* Services */

var museum_objectcatServices = angular.module('museum_objectcatServices', ['ngResource']);

museum_objectcatServices.factory('museum_object', ['$resource',
  function($resource){
    return $resource('http://museums.bristol.gov.uk/m-shed/id/:museum_objectId.json', {}, {
      query: {method:'GET', params:{museum_objectId:'museum_objectId'}, isArray:true}
    });

  }]);




museum_objectcatServices.factory('museum_object_index', ['$resource',
  function($resource){
    return $resource('http://museums.bristol.gov.uk/m-shed/index-:listType.json', {}, {
      
	   query_index: {method:'GET', params:{}, isArray:true}
    });

  }]);

'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('http://museums.bristol.gov.uk/m-shed/id/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:phoneId}, isArray:true}
    });

  }]);




phonecatServices.factory('Phone_index', ['$resource',
  function($resource){
    return $resource('http://museums.bristol.gov.uk/m-shed/index-:listType.json', {}, {
      
	   query_index: {method:'GET', params:{}, isArray:true}
    });

  }]);

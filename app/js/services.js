'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('http://museums.bristol.gov.uk/m-shed/id/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'index'}, isArray:true}
    });

  }]);




phonecatServices.factory('Phone_index', ['$resource',
  function($resource){
    return $resource('http://museums.bristol.gov.uk/m-shed/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'index'}, isArray:true}
    });

  }]);

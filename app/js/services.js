'use strict';

/* Services */

var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('http://museums.bristol.gov.uk/m-shed/:phoneId.JSON', {}, {
      query: {method:'GET', params:{phoneId:'bristol_emu_output'}, isArray:true}
    });
  }]);

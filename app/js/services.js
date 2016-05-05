'use strict';

/* Services */
var locations = window.location.href
var dir = window.location.href.split("#")[0]


 




var museum_objectcatServices = angular.module('museum_objectcatServices', ['ngResource']);

museum_objectcatServices.factory('museum_object', ['$resource',
  function($resource){
    return $resource(dir+'/id/:museum_objectId.json', {}, {
      query: {method:'GET', params:{museum_objectId:'museum_objectId'}, isArray:true}
    });

  }]);



museum_objectcatServices.factory('museum_object_index', ['$resource',
  function($resource){
    return $resource(dir+'/data/index-:listType.json', {}, {
      
	   query_index: {method:'GET', params:{}, isArray:true}
    });

  }]);

  museum_objectcatServices.factory('artist_list', ['$resource',
  function($resource){
    return $resource(dir+'/data/artist_list.json', {}, {
	   query_index: {method:'GET', params:{}, isArray:true}
    });

  }]);
  
    museum_objectcatServices.factory('gallery_list', ['$resource',
  function($resource){
    return $resource(dir+'/data/gallery_list.json', {}, {
	   query_index: {method:'GET', params:{}, isArray:true}
    });

  }]);
  
  museum_objectcatControllers.controller('MyCtrl', ['$scope', '$debounce', function($scope, $debounce) {
        $scope.val = 0;
        $scope.inc = function() {
            $debounce(increase, 300);
        };

        var increase = function() {
            $scope.val++;
        }           
    }])
    // http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
    // adapted from angular's $timeout code
    museum_objectcatServices.factory('$debounce', ['$rootScope', '$browser', '$q', '$exceptionHandler',
        function($rootScope,   $browser,   $q,   $exceptionHandler) {
            var deferreds = {},
                methods = {},
                uuid = 0;

            function debounce(fn, delay, invokeApply) {
                var deferred = $q.defer(),
                    promise = deferred.promise,
                    skipApply = (angular.isDefined(invokeApply) && !invokeApply),
                    timeoutId, cleanup,
                    methodId, bouncing = false;

                // check we dont have this method already registered
                angular.forEach(methods, function(value, key) {
                    if(angular.equals(methods[key].fn, fn)) {
                        bouncing = true;
                        methodId = key;
                    }
                });

                // not bouncing, then register new instance
                if(!bouncing) {
                    methodId = uuid++;
                    methods[methodId] = {fn: fn};
                } else {
                    // clear the old timeout
                    deferreds[methods[methodId].timeoutId].reject('bounced');
                    $browser.defer.cancel(methods[methodId].timeoutId);
                }

                var debounced = function() {
                    // actually executing? clean method bank
                    delete methods[methodId];

                    try {
                        deferred.resolve(fn());
                    } catch(e) {
                        deferred.reject(e);
                        $exceptionHandler(e);
                    }

                    if (!skipApply) $rootScope.$apply();
                };

                timeoutId = $browser.defer(debounced, delay);

                // track id with method
                methods[methodId].timeoutId = timeoutId;

                cleanup = function(reason) {
                    delete deferreds[promise.$$timeoutId];
                };

                promise.$$timeoutId = timeoutId;
                deferreds[timeoutId] = deferred;
                promise.then(cleanup, cleanup);

                return promise;
            }


            // similar to angular's $timeout cancel
            debounce.cancel = function(promise) {
                if (promise && promise.$$timeoutId in deferreds) {
                    deferreds[promise.$$timeoutId].reject('canceled');
                    return $browser.defer.cancel(promise.$$timeoutId);
                }
                return false;
            };

            return debounce;
    }]);


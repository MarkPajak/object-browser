'use strict';

/* Controllers */

var museum_objectcatControllers = angular.module('museum_objectcatControllers', []);

  

	
museum_objectcatControllers.controller('museum_objectListCtrl', ['$scope',  'museum_object_index',
  function($scope, museum_object) {
$scope.listType = 'stories';
$scope.museum_objects = museum_object.query_index({listType:$scope.listType});
//    $scope.museum_objects = museum_object.query();
    $scope.orderProp = 'age';
		$scope.items = [{
  id: 1,
  label: 'themes',
  subItem: { name: 'themes' }
},{
  id: 2,
  label: 'displays',
  subItem: { name: 'displays' }
},{
  id: 3,
  label: 'stories',
  subItem: { name: 'stories' }
}, {
  id: 4,
  label: 'objects',
  subItem: { name: 'objects' }
}, {
  id: 5,
  label: 'multimedia',
  subItem: { name: 'multimedia' }
}, {
  id: 6,
  label: 'all',
  subItem: { name: 'all' }
}];
$scope.selected = $scope.items[0];
 $scope.update = function() {

     $scope.museum_objects = museum_object.query_index({listType:$scope.listType.label});
    };
	
  }]);

museum_objectcatControllers.controller('museum_objectDetailCtrl', ['$scope', '$routeParams', 'museum_object',
  function($scope, $routeParams, museum_object) {
    $scope.museum_object = museum_object.get({museum_objectId: $routeParams.museum_objectId}, function(museum_object) {
      $scope.mainImageUrl = "http://museums.bristol.gov.uk/multimedia/entry.php?request=resource&irn="+museum_object.images[0].image+"&width=600&format=jpeg";
    });

    $scope.setImage = function(imageUrl) {

      $scope.mainImageUrl = imageUrl;
    };
  }]);

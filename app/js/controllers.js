'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

  

	
phonecatControllers.controller('PhoneListCtrl', ['$scope',  'Phone_index',
  function($scope, Phone) {
$scope.listType = 'stories';
$scope.phones = Phone.query_index({listType:$scope.listType});
//    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
		$scope.items = [{
  id: 1,
  label: 'stories',
  subItem: { name: 'stories' }
}, {
  id: 2,
  label: 'objects',
  subItem: { name: 'objects' }
}];
$scope.selected = $scope.items[0];
 $scope.update = function() {
console.log($scope.listType)
     $scope.phones = Phone.query_index({listType:$scope.listType.label});
    };
	
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);

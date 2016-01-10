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

museum_objectcatControllers.controller('museum_objectDetailCtrl', ['$scope', '$routeParams', 'museum_object','$sce', "$timeout",
  function($scope, $routeParams, museum_object,$sce,$timeout) {
   
   $scope.museum_object = museum_object.get({museum_objectId: $routeParams.museum_objectId}, function(museum_object) {
      $scope.mainImageUrl = "http://museums.bristol.gov.uk/multimedia/entry.php?request=resource&irn="+museum_object.images[0].image+"&width=600&format=jpeg";
	


		

	
    $scope.setImage = function(imageUrl) {

      $scope.mainImageUrl = imageUrl;
    };
	
	})
  }]);
  
  museum_objectcatControllers.controller('HomeCtrl',
        ["$sce", "$timeout", "$scope","museum_object","$routeParams",function ($sce, $timeout,$scope,museum_object,$routeParams) {
		
		 var controller = this;
            controller.state = null;
            controller.API = null;
            controller.currentVideo = 0;
			
			 controller.onPlayerReady = function(API) {
                controller.API = API;
            };

            controller.onCompleteVideo = function() {
                controller.isCompleted = true;

                controller.currentVideo++;

                if (controller.currentVideo >= controller.videos.length) controller.currentVideo = 0;

                controller.setVideo(controller.currentVideo);
            };

            controller.videos = [
            {
               
            },
            
        ];

            controller.config = {
                preload: "none",
                autoHide: false,
                autoHideTime: 3000,
                autoPlay: false,
                sources: controller.videos[0].sources,
                theme: {
                    url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                },
                plugins: {
                    poster: "http://www.videogular.com/assets/images/videogular.png"
                }
            };

            controller.setVideo = function(index) {
                controller.API.stop();
                controller.currentVideo = index;
                controller.config.sources = controller.videos[index].sources;
                $timeout(controller.API.play.bind(controller.API), 100);
            };
			
				
	  $scope.museum_object = museum_object.get({museum_objectId: $routeParams.museum_objectId}, function(museum_object) {
      $scope.mainImageUrl = "http://museums.bristol.gov.uk/multimedia/entry.php?request=resource&irn="+museum_object.images[0].image+"&width=600&format=jpeg";
	
			var source
			if(museum_object.video){
			
			_.each(museum_object.video, function(vid) { 

					
					source= {
						sources: [
							{src: $sce.trustAsResourceUrl("http://museums.bristol.gov.uk/multimedia/entry.php?request=resource&irn="+vid.video), type: "video/mp4",
							name:vid.name
							}
						]
					}

					controller.videos.push(source)
									});
			}
			console.log(controller.videos)
	
	})
  }]);

'use strict';

/* Controllers */

var locations = window.location.href
var dir = window.location.href.split("#")[0]
 dir = dir.substring(0, dir.lastIndexOf('app/'));



var museum_objectcatControllers = angular.module('museum_objectcatControllers', []);


museum_objectcatControllers.controller('slideshowCtrl', 
										['$scope', 
										'$routeParams',
										'museum_object_index',
		function($scope,  $routeParams,museum_object) {

				
				var fotorama = $('.fotorama').fotorama();
				$scope.dismiss = function() {
					   element.modal('hide');
				   }; 
	 

					$scope.filter = function(result) {
						var filter=$scope.filtervalue
						if(filter.length>1){
						$scope.listType=$routeParams.index||"objects"
						$scope.shuffle="false"
						}
						else{
					
						$scope.listType=$routeParams.index||"objects"
						$scope.shuffle="true"
						}
						
									$scope.museum_objects = museum_object.query_index({listType:$scope.listType}, function(museum_objects) {
									
									
									
									var datax = []
									var keys=[]
									
									
									//decide which asearch to run
									var search_type = "all"
									if(filter.length>1){
									search_type = "fuzzy_match"
									}
									if($routeParams.ids){
									search_type = "record_set"
									}
									
									
									
								switch(search_type) {
									case "all":
													//return everything in the chosen list
													console.log("returning entire list")
													var result = $scope.museum_objects;
										break;
									case "fuzzy_match":
													//run a fuzzy text search
													  var options = {
													  caseSensitive: false,
													  includeScore: false,
													  shouldSort: true,
													  threshold: 0.4,
													  location: 1,
													  distance:1,
													  maxPatternLength: 1,
													  keys: ["name","description"]
													};
													
													console.log("searching on"+filter.length)
													var fuse = new Fuse( $scope.museum_objects, options); // "list" is the item array
													var result = fuse.search(filter);
													result=JSON.stringify(result)
													var result = JSON.parse(result);
										break;
										case "record_set":
										console.log("returning record set")
										
										 var options = {
													   threshold: 1.0,
													  location: 1.0,
													  distance:1.0,
													  maxPatternLength: 6,
													  keys: ["id","name"]
													};
													
													
										var fuse = new Fuse( $scope.museum_objects, options); // "list" is the item array
													var result = fuse.search("3275");
													result=JSON.stringify(result)
													var result = JSON.parse(result);
													
										break;
									default:
										 alert('which search?')
								}
								
								
									
									$scope.dismiss();
									console.log('found '+ result.length)
									if(result.lenth>0){
										$scope.dismiss();
									}
									
									
									
									
									
									
									angular.forEach(result, function(value, key) {
				
										// if(value.name&&value.description){
											 name=value.name
											 name=name.toUpperCase()
											
											// if(name.indexOf(filter.toUpperCase())>-1 ||filter=="" ||value.description.toUpperCase().indexOf( filter.toUpperCase())>-1){
											
												var img={img: dir+'/assets/' + value.image + '_detail.jpg', 
														full:  dir+'/assets/' + value.image + '_detail.jpg', 
														thumb:  dir+'/assets/' + value.image + '_thumb.jpg',
														id:value.id ,														
														gallery:value.gallery ,
														caption:value.name,
														description:value.description
														}
														
														
														
												if(value.video) {
														img["video"] =  dir+"/assets/videos/"+value.video.video+".mp4";
												}
												if(value.audio) {
														var audiohtml='<div data-img:"'+dir+'/assets/' + value.image + '_detail.jpg">';
														audiohtml+='<audio class="audioControls" controls loop>';
														audiohtml+='<source src="'+dir+'/assets/audio/'+value.audio.video+'.'+value.audio.filetype+'">';
														audiohtml+='</audio>';
														audiohtml+='</div>';
													
														img["html"] =audiohtml ;
														//img["img"] ="" ;
														
														
												}
												//console.log(value.orientation)
												if(value.orientation=="landscape") {
														img["fit"] = "cover";
														
												}else{
														img["fit"] = "contain";
												
												}
													//console.log(img["fit"])
													//if($.inArray( value.id, keys )==-1){
													datax.push(img );
													keys.push(value.id)
													//}
										 //  }
									   //}
									});

								var data = [];
								data.data=(datax );
								var fotorama = $('.fotorama').data('fotorama');	
							
								fotorama.load(datax);
								
								 });
								 
								fotorama.on('fotorama:show', function (e, fotorama) {
								console.log(fotorama.activeFrame)
									     $('audio').attr("autoplay","");
									    
										 $.getJSON( dir+"/id/"+fotorama.activeFrame.id+".json", function( data ) {
												var items = [];
												$('#modaltitle').text(fotorama.activeFrame.caption)
												$('#modalInfo').html(data.description)
												var children=data.child
												console.log('children',children)
												var child_id_string = "#/slideshow/ids/"
												angular.forEach(children, function(value, key) {
												child_id_string+=","+value.id
												$('#childlinks').show()
												})
												$('#childlinks').attr("href",child_id_string)
												
												if(fotorama.activeFrame.gallery[0]){
												
												var gallerthtml="<p> You can find out more about this in the ";
													gallerthtml+=fotorama.activeFrame.gallery[0]['EveEventTitle'];
													gallerthtml+=" gallery."	
													$('#gallery').html(gallerthtml)	
												}												
												console.log( $('audio'))
										
											});
								});
					
					



    };
	$scope.filtervalue="";
	  $scope.filter("")
  }]);
  


  
	
museum_objectcatControllers.controller('museum_objectListCtrl', ['$scope',  'museum_object_index','artist_list','gallery_list','$debounce',
  function($scope, museum_object,artist_list,gallery_list,$debounce) {
  
$scope.listType = 'objects';

$scope.museum_objects = museum_object.query_index({listType:$scope.listType});

$scope.artists = artist_list.query_index();
$scope.galleries = gallery_list.query_index();
$scope.location="choose a gallery"
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


$scope.$watch('queryInput', function(newValue, oldValue) {
    if (newValue === oldValue) { return; }
    $debounce(applyQuery, 350);
	
});


var applyQuery = function() { 
    $scope.crabs = $scope.queryInput;
};


$scope.$watch('artist', function(newValue, oldValue) {
    if (newValue === oldValue) { return; }
	console.log('find artist')
    $debounce(applyArtistQuery, 750);
	
});


var applyArtistQuery = function() { 

    $scope._artist = $scope.artist;
};




	
  }]);

museum_objectcatControllers.controller('museum_objectDetailCtrl', ['$scope', '$routeParams', 'museum_object','$sce', "$timeout",
  function($scope, $routeParams, museum_object,$sce,$timeout) {
   
   $scope.museum_object = museum_object.get({museum_objectId: $routeParams.museum_objectId}, function(museum_object) {
      $scope.mainImageUrl = "http://museums.bristol.gov.uk/multimedia/entry.php?request=resource&irn="+museum_object.images[0].image+"&width=600&format=jpeg";
	
	
    $scope.setImage = function(imageUrl) {

      $scope.mainImageUrl = imageUrl.image;
	  $scope.museum_object.description = imageUrl.description;
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
                    poster: "http://museums.bristol.gov.uk/m-shed/assets/"+vid.image+"_detail.jpg"
                }
            };

					controller.videos.push(source)
									});
			}
			console.log(controller.videos)
	
	})
  }]);

$(function(){
    $("#show_new_route").click(codeAddress);
    $("#save_new_route").click(function(){
       var points = [];
       var trip = {};
       var way = directionsDisplay.directions.routes[0].legs[0];
       trip.begin = {'lat': way.start_location.lat(), 'lng': way.start_location.lng()};
       trip.end = {'lat': way.end_location.lat(), 'lng': way.end_location.lng()};
       var way_points = way.via_waypoints;
        for(var i=0;i<way_points.length;i++){
            points[i] = [way_points[i].lat(),way_points[i].lng()];
          }
      trip.waypoints = points;

      trip.waypoints.forEach(function(item, index){
          $("#new_trip").append("<input name='trip[waypoints]["+index+"][lat]' value='"+item[0]+"'>")
          $("#new_trip").append("<input name='trip[waypoints]["+index+"][long]' value='"+item[1]+"'>")
      })
      $("#new_trip").submit();
    });
});
  
    
var rendererOptions = {
  draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();
var map;
var sf = new google.maps.LatLng(37.7434701,-122.4557752);
var geocoder = new google.maps.Geocoder();

function initialize() {

		var mapOptions = {
			zoom: 11,
			center: sf
		};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));
}

 
function calcRoute(latLngLocs) {
  var start = latLngLocs[0];
  var end = latLngLocs[1];
  var request = {
    origin: start,
    destination: end,
    avoidHighways: true,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function getlonglat(index, addresses, callback, data) {
  var data = data || [];
  if(index < addresses.length){
    var address = addresses[index];
    geocoder.geocode({ 'address': address}, function(results, status) {
       var coords = [];
       if (status == google.maps.GeocoderStatus.OK) {
        coords[0]=results[0].geometry.location.lat();
        coords[1]=results[0].geometry.location.lng();
        
        var loc = new google.maps.LatLng(coords[0], coords[1]);
        data.push(loc)
        getlonglat(index+1, addresses,callback,data)
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  } else {
    callback(data)
  }
}


function codeAddress(event) {
  event.preventDefault();
  
	var address1 = document.getElementById("routeStart").value;
	var address2 = document.getElementById("routeEnd").value;

  getlonglat(0, [address1,address2], calcRoute)
}



 google.maps.event.addDomListener(window, 'load', initialize);


function calcSavedRoute() {
  
  var rawStart = gon.trip[0];
  var rawEnd = gon.trip.pop();

  getlonglat(0,[rawStart, rawEnd], function(data){
    var start = data[0], end = data[1];
    var waypts = []; 
    for (var i = 1; i < gon.trip.length; i+=2) {
      waypts.push({
        location: new google.maps.LatLng(gon.trip[i], gon.trip[i+1]),
        stopover: true
      });
    }
    var request = {
       origin: start,
       destination: end,
       waypoints: waypts,
       optimizeWaypoints: true,
       avoidHighways: true,
       provideRouteAlternatives: true,
       travelMode: google.maps.TravelMode.DRIVING
     };

    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
    
    
  });

}
  


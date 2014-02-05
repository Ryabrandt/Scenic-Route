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

function getlonglat(address){
 var coords=[];
 geocoder.geocode( { 'address': address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
    coords[0]=results[0].geometry.location.lat();
    coords[1]=results[0].geometry.location.lng();

  } 
  else {
    alert("Geocode was not successful for the following reason: " + status);
       }
});
 return coords;
}
 
function calcRoute(startloc,endloc) {

  var start = new google.maps.LatLng(startloc[0],startloc[1]);
  var end =new google.maps.LatLng(endloc[0],endloc[1]);
  var request = {
    origin:start,
    destination:end,
    travelMode: google.maps.TravelMode.DRIVING
  };

  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function codeAddress(event) {
  event.preventDefault();
  
	var address1 = document.getElementById("routeStart").value;
	var address2 = document.getElementById("routeEnd").value;

	var start_position=getlonglat(address1);    
	var finish_position=getlonglat(address2);
	
    setTimeout(function() {calcRoute(start_position,finish_position);},800);
}

google.maps.event.addDomListener(window, 'load', initialize);





// function calcSavedRoute() {
//   var start = 
//   var end = 
//   var waypts = [];
//   var checkboxArray = 
//   for (var i = 0; i < checkboxArray.length; i++) {
//     if (checkboxArray.options[i].selected == true) {
//       waypts.push({
//           location:checkboxArray[i].value,
//           stopover:true
//       });
//     }
//   }


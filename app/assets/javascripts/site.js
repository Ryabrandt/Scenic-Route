var rendererOptions = {
  draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();
var map;
var sf = new google.maps.LatLng(37.7434701,-122.4557752);

function initialize() {

		var mapOptions = {
			zoom: 11,
			center: sf
		};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));

    google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
    	computeTotalDistance(directionsDisplay.getDirections());
  	});

  	calcRoute();
}

function calcRoute() {

  var request = {
    origin: 'San Francisco, CA',
    destination: 'San Jose, CA',
    waypoints:[{location: 'San Mateo, CA'}, {location: 'Menlo Park, CA'}],
    travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}

function computeTotalDistance(result) {
  var total = 0;
  var myroute = result.routes[0];
  for (var i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
  }
  total = total / 1609;
  document.getElementById('total').innerHTML = total.toFixed(2) + ' mi';
}


google.maps.event.addDomListener(window, 'load', initialize);

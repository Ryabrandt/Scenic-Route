$(document).ready(function () {
    //stick in the fixed 100% height behind the navbar but don't wrap it
    $('#slide-nav.navbar .container').append($('<div id="navbar-height-col"></div>'));
    // Enter your ids or classes
    var toggler = '.navbar-toggle';
    var pagewrapper = '#page-content';
    var navigationwrapper = '.navbar-header';
    var menuwidth = '100%'; // the menu inside the slide menu itself
    var slidewidth = '80%';
    var menuneg = '-100%';
    var slideneg = '-80%';


    $("#slide-nav").on("click", toggler, function (e) {

        var selected = $(this).hasClass('slide-active');

        $('#slidemenu').stop().animate({
            left: selected ? menuneg : '0px'
        });

        $('#navbar-height-col').stop().animate({
            left: selected ? slideneg : '0px'
        });

        $(pagewrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });

        $(navigationwrapper).stop().animate({
            left: selected ? '0px' : slidewidth
        });


        $(this).toggleClass('slide-active', !selected);
        $('#slidemenu').toggleClass('slide-active');


        $('#page-content, .navbar, body, .navbar-header').toggleClass('slide-active');
    });
    var selected = '#slidemenu, #page-content, body, .navbar, .navbar-header';
    if( /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)) { 
        if ($(window).width() > 767 && $('.navbar-toggle').is(':hidden')) {
            $(selected).removeClass('slide-active');
        }
      }
});
  
var Mapper = function(option){

  var rendererOptions = {
    draggable: true
  };

  var map;
  var sf = new google.maps.LatLng(37.7434701,-122.4557752);
  var geocoder = new google.maps.Geocoder();


  var api = {
    directionsDisplay: new google.maps.DirectionsRenderer(rendererOptions),
    directionsService: new google.maps.DirectionsService(),
    initialize: function() {

    		var mapOptions = {
    			zoom: 12,
    			center: sf
    		};
    	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        api.directionsDisplay.setMap(map);
        api.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
    },

     
    calcRoute: function(latLngLocs) {
      var start = latLngLocs[0];
      var end = latLngLocs[1];
      var request = {
        origin: start,
        destination: end,
        avoidHighways: true,
        travelMode: google.maps.TravelMode.DRIVING
      };

      api.directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          api.directionsDisplay.setDirections(response);
        }
      });
    },

    getlonglat: function(index, addresses, callback, data) {
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
            api.getlonglat(index+1, addresses,callback,data)
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });
      } else {
        callback(data)
      }
    },


    codeAddress: function(event) {
      event.preventDefault();
    
    	var address1 = document.getElementById("routeStart").value;
    	var address2 = document.getElementById("routeEnd").value;    
      api.getlonglat(0, [address1,address2], api.calcRoute)
    },

    calcSavedRoute: function() {
      
      var rawStart = gon.trip[0];
      var rawEnd = gon.trip.pop();

      api.getlonglat(0,[rawStart, rawEnd], function(data){
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

        api.directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            api.directionsDisplay.setDirections(response);
          }
        });
        
        
      });

    }
  }


  if(option){
    google.maps.event.addDomListener(window, 'load', api.initialize);

  $("#show_new_route").click(api.codeAddress);
  $("#save_new_route").click(function(){
   var points = [];
   var trip = {};
     var way = api.directionsDisplay.directions.routes[0].legs[0];
     trip.begin = {'lat': way.start_location.lat(), 'lng': way.start_location.lng()};
     trip.end = {'lat': way.end_location.lat(), 'lng': way.end_location.lng()};
     var way_points = way.via_waypoints;
      for(var i=0;i<way_points.length;i++){
          points[i] = [way_points[i].lat(),way_points[i].lng()];
        }
      trip.waypoints = points;

      trip.waypoints.forEach(function(item, index){
        $("#new_trip").append("<input type='hidden' name='trip[waypoints]["+index+"][lat]' value='"+item[0]+"'>")
        $("#new_trip").append("<input type='hidden' name='trip[waypoints]["+index+"][long]' value='"+item[1]+"'>")
      })
        $("#new_trip").submit();
      
    });
  } 
  return api;
}

var showRoute = function(){
    var ShowMapper = Mapper(false);
   (function makeMap(Mapper,callback){ 
        map = new google.maps.Map(document.getElementById('map-canvas'));
        Mapper.directionsDisplay.setMap(map);
        Mapper.directionsDisplay.setPanel(document.getElementById('directionsPanel'));
        callback();
    })(ShowMapper, ShowMapper.calcSavedRoute)
  };


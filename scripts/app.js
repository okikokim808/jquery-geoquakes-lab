// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  // CODE IN HERE!
  $.ajax({
    type: 'GET',
    url: weekly_quakes_endpoint,
    success: onSuccess,
    error:  function(reponse){
      console.log('error');
    }
  });
  function onSuccess(response){
    var numQuakes= response.features.length;

    for(var i = 0; i < response.features.length; i++){
      var displayTitle = response.features[i].properties.title;
      var displayLat = response.features[i].geometry.coordinates[0];
      var displayLong = response.features[i].geometry.coordinates[1];
      $('#info').append(`<p>${displayTitle} Latitude: ${displayLat} Longetude: ${displayLong}</p>`);
    }
  }
  function initMap() {
    // The location of Uluru
    var location = {lat: -25.344, lng: 131.036};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        $('#map'), {zoom: 4, center: location});
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: location, map: map});
  }

});

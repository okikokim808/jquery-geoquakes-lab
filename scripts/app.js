// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function () {
  // CODE IN HERE!
  $.ajax({
    type: 'GET',
    url: weekly_quakes_endpoint,
    success: onSuccess,
    error: function (reponse) {
      console.log('error');
    }
  });
  var map;
  function initMap(response) {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: new google.maps.LatLng(2.8, -187.3),
      mapTypeId: 'terrain'
    });
  }
  function addMarker(latlng) {
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icon = {
      url: "images/earthquake.png", // url
      scaledSize: new google.maps.Size(25, 25), // scaled size
    };
    new google.maps.Marker({
      position: latlng,
      map: map,
      title: 'Hello',
      icon: icon,
    });
  }
  function onSuccess(response) {
    var numQuakes = response.features.length;
    initMap(response);
    for (var i = 0; i < response.features.length; i++) {
      var displayTitle = response.features[i].properties.title;
      var displayLat = response.features[i].geometry.coordinates[0];
      var displayLong = response.features[i].geometry.coordinates[1];
      var latlng = { lat: displayLong, lng: displayLat };
      addMarker(latlng);
      $('#info').append(`<p>${displayTitle} Latitude: ${displayLat} Longetude: ${displayLong}</p>`);
    }
  }
});

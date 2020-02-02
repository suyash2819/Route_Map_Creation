var onChangeHandler = function() {
  initMap();
}
document.getElementById('ViewRoute').addEventListener('click', onChangeHandler)

function initMap()
{
    var directionsRenderer = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: {
        lat: 12.9716,
        lng: 77.5946
      }
    });

  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById('right-panel'));

  var control = document.getElementById('floating-panel');
  /* control.style.display = 'block'; */
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);
   /* calculateAndDisplayRoute(directionsService, directionsRenderer) */;
  /* document.getElementById('end').addEventListener('change', onChangeHandler)*/
  calculateAndDisplayRoute(directionsService, directionsRenderer);
}
  /* onChangeHandler(); */

function calculateAndDisplayRoute(directionsService, directionsRenderer)
{
    var lat= document.getElementById('lat').value;
    var lng= document.getElementById('long').value;
    var HSR = {lat: lat, lng: lng};
    console.log(HSR);
  	var StartArea=document.getElementById('StartArea').value;
    var City=document.getElementById('City').value;
    var EndArea=document.getElementById('EndArea').value;
    var start = `${StartArea},${City}, India` //new google.maps.LatLng(12.9698,77.7500)//document.getElementById('start').value;
    var end =  `${EndArea},${City}, India`//new google.maps.LatLng(12.9304, 77.6784);//document.getElementById('end').value;
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}

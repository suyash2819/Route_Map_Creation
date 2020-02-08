var stops = [];
var lat = document.getElementById("lat");
var long = document.getElementById("long");
var input = document.getElementById("StopInput");
document.getElementById("ViewRoute").addEventListener("click", initMap);
// document.getElementById("AddStop").addEventListener("click", AddStop);

function initMap() {
  console.log("h");
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 20.5937, lng: 78.9629 }
  });
  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById("right-panel"));

  calculateAndDisplayRoute(directionsService, directionsRenderer);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  var StartArea = document.getElementById("StartArea").value;
  var City = document.getElementById("City").value;
  var EndArea = document.getElementById("EndArea").value;
  var start = `${StartArea},${City}, India`; //new google.maps.LatLng(12.9698,77.7500)//document.getElementById('start').value;
  var end = `${EndArea},${City}, India`; //n
  console.log(stops);
  var waypts = [];
  for (var i = 0; i < stops.length; i++) {
    console.log(stops[i]);
    waypts.push({
      location: `${stops[i]}, ${City}, India`,
      stopover: true
    });
    console.log(waypts);
  }

  directionsService.route(
    {
      origin: start,
      destination: end,
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: "DRIVING"
    },
    function(response, status) {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
        document.getElementById("map").scrollIntoView();
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}

function AddStop() {
  document.getElementById("stopDet").style.display = "block";
  console.log(stops);
  var number = document.getElementById("NumberStops").value;
  console.log(number);
  document.getElementById("NumberStops").required = true;
  document.getElementById("StopInput").required = true;
  document.getElementById("lat").required = true;
  document.getElementById("long").required = true;
  if(input.value)
    stops.push(input.value);
  if(input.value)
    document.getElementById('StopAdded').innerHTML="Stop Successfully added"
  $("#StopAdded").show().delay(1000).fadeOut();
  if (input.value && stops.length < number) {
    console.log("yes");
    input.value = "";
    lat.value = "";
    long.value = "";
  }
}

function initMap(){
	var directionsService = new google.maps.DirectionsService;
  	var directionsDisplay = new google.maps.DirectionsRenderer;
	var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: -9.1191427, lng: -77.0349046},
  	});
  	directionsDisplay.setMap(map);



	function buscar(){
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
		}
	}
	document.getElementById("encuentrame").addEventListener("click", buscar);
	var latitud,longitud;

	
	var funcionExito = function(posicion){
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var miUbicacion = new google.maps.Marker({
			position: {lat: latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map
		});

		map.setZoom(17);
		map.setCenter({lat: latitud,lng: longitud});
	}

	var funcionError = function (error){
		alert("Tenemos un problema con encontrar tu ubicación");
	}
	
    document.getElementById('ruta').addEventListener('click', function(){
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  	});

	function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
    origin: document.getElementById('origen').value,
    destination: document.getElementById('destino').value,
    travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
}
}
  
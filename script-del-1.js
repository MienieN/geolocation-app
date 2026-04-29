// part 1: fetch and show my current position
let options = {};

function success(position) {
    let coords = position.coords;
    displayPosition(coords);
}

function error(err) {
    console.warn("Something went wrong: ", err.message);
}

function displayPosition(coords){
    $("#longitude").text(coords.longitude);
    $("#latitude").text(coords.latitude);
    $("#accuracy").text(coords.accuracy);
    $("#altitude").text(coords.altitude ?? 0);
    $("#accuracy-altitude").text(coords.altitudeAccuracy ?? 0);
    $("#speed").text(coords.speed ?? NaN);   
}

// Skicka med våra funktioner och inställningar,
// dessa kommer sedan anropas när en position försöker fastställas.
navigator.geolocation.getCurrentPosition(success, error, options);
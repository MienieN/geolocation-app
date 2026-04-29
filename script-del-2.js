// part 2: update my position (continuously)

let options = {
    // Försök tvinga enheten till en så precis position som möjligt
    enableHighAccuracy: true,
    // Maximal tid i millisekunder som enheten har på sig att ge oss en position
    timeout: 5000,
    // Hur länge vår position får tillfälligt lagras (millisekunder)
    maximumAge: 0
};

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
// dessa kommer sedan anropas kontinuerligt medan vi rör på oss.
let watchID = navigator.geolocation.watchPosition(success, error, options);

// Skulle vi sedan vilja avbryta detta hade vi anropat `clearWatch`
//navigator.geolocation.clearWatch(watchID);
// part 3: show speed and colour coded feedback (continuously)

// options = settings for the gps
let options = {
    enableHighAccuracy: true,       // as accurate as possible
    timeout: 5000,                  // max 5 seconds (5000 milliseconds) to find position
    maximumAge: 0                   // don't use old positions, get a new one.
};

// when gps successfully finds the user's position
function success(position) {
    let coords = position.coords;   // find the co-ordinates of the users location (see traits)
    displayPosition(coords);        // writes the co-ordinates information traits to the HTML
    displaySpeed(coords.speed)      // calculates the speed in meters per second
}

// when gps fails to find user's position
function error(err) {
    console.warn("Something went wrong: ", err.message);    // message in the console
}

// receives the co-ordinates and extracts information traits to display in the UI
function displayPosition(coords){
    $("#longitude").text(coords.longitude);         // adds the longitude co-ordinates to <span id="longitude"></span>
    $("#latitude").text(coords.latitude);                        // ^ matches span element and relevant info
    $("#accuracy").text(coords.accuracy);                        // ^
    $("#altitude").text(coords.altitude ?? "");                  // ^ if altitude exist, use it, else use ""
    $("#accuracy-altitude").text(coords.altitudeAccuracy ?? ""); // ^
}

// a function to handle the geolocation speed (m/s) and convert it to km/h
function displaySpeed(metersPerSecond){
    if(metersPerSecond === null){                       // sometimes gps gives no speed value(i.e indoors)
        $("#speed").text("0");                          // update the UI speed field to show message
        $("#currect-speed").text("okänd hastighet");    // update alert box text (coloured boxes)
        
        $("#speed-container").css({
            "backgroundColour" : "rgb(248, 215, 218)",
            "textColour" : "rgb(132, 32, 41)"
        });

        return;                                         // stops if speed is null
    }

    let speedKmH = (metersPerSecond * 3.6);             // converts speed from m/s to km/h
    console.log("ms", metersPerSecond);
    console.log("km", speedKmH);

    $("#speed").text(speedKmH);                                 // displays speed in UI (all decimals)
    $("#currect-speed").text(speedKmH.toFixed(2) + "km/h");     // alert box show speed with only 2 decimals

    updateSpeedColour(speedKmH);                                // updates the alert box colours
}

// updates the alert boxes rather than using generic colours and layout
function updateSpeedColour(speedKmH){
    let backgroundColour;
    let textColour;

    if(speedKmH < 2){
        backgroundColour = "rgb(248, 215, 218)";            // this is being added as css hence "string"
        textColour = "rgb(132, 32, 41)";
    }
    
    else if(speedKmH >= 2 && speedKmH <= 4){
        backgroundColour = "rgb(255, 243, 205)";
        textColour = "rgb(102, 77, 3)";
    }

    else{
        backgroundColour = "rgb(209, 231, 221)";
        textColour = "rgb(15, 81, 50)";
    }

    $("#speed-container").css({
        "background-color" : backgroundColour,
        "color" : textColour
    });
}

// Skicka med våra funktioner och inställningar,
// dessa kommer sedan anropas kontinuerligt medan vi rör på oss.
navigator.geolocation.watchPosition(success, error, options);

// Skulle vi sedan vilja avbryta detta hade vi anropat `clearWatch`
//navigator.geolocation.clearWatch(watchID);
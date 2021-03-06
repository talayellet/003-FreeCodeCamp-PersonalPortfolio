var weatherObj = {};
// Does your browser support geolocation?
fRunGeolocation = function () {
    if ("geolocation" in navigator) {
        fGetLocation();
        return true;
    } else {
        $(".content-wrapper").html("<h1 class='not-supported'>Sorry, your browser doesn't support geo-location!</h1>"); //DEBUG
        return false;
    }
}

// fGetLocation
fGetLocation = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
        fDataHandler(position.coords.latitude+','+position.coords.longitude) //load weather using your lat/lng coordinates
    })
}

// fSelectIcon
fSelectIcon = function (code) {
    // Case storm
    var storm = [0, 1, 2, 3, 4, 37, 38, 39, 45, 47];
    for (var i = 0; i < storm.length; i++) {
        if (code == storm[i]) {
            return "thunder.svg";
        }
    }

    // Case rain
    var rain = [6, 9, 10, 11, 12, 14, 35, 40, 42];
    for (var i = 0; i < rain.length; i++) {
        if (code == rain[i]) {
            return "rainy-6.svg";
        }
    }

    // Case snow
    var snow = [5, 7, 13, 14, 15, 16, 41, 42, 43, 46];
    for (var i = 0; i < snow.length; i++) {
        if (code == snow[i]) {
            return "snowy-6.svg";
        }
    }

    // Case cloudy
    var cloudy = [26, 27, 28, 29, 30, 44];
    for (var i = 0; i < cloudy.length; i++) {
        if (code == cloudy[i]) {
            return "cloudy.svg";
        }
    }

    // Case day
    if (code == 32 || code == 34 || code == 36) {
        return "day.svg";
    }

    // Case night
    if (code == 31 || code == 33) {
        return "night.svg";
    }
    // Case wind
    if (code == 23 || code == 24) {
        return "wind.ico";
    }

    // Case fog
    var fog = [19, 20, 21, 22];
    for (var i = 0; i < fog.length; i++) {
        if (code == fog[i]) {
            return "fog.ico";
        }
    }

    // Case no data
    if (code == 3200) {
        return "fog.ico";
    }
}

fDisplayData = function (weatherObj) {
    $("#temperature-icon").html('<img src="./icons/' + fSelectIcon(weatherObj.icon) + '" alt="' + fSelectIcon(weatherObj.icon) + '">');
    $("#temperature").html('<strong>' + weatherObj.temperature + '</strong>');
    $("#temperature-units").html('<strong>' + weatherObj.temperatureUnits + '</strong>');
    $("#location").html(weatherObj.city + ", " + weatherObj.region + ", " + weatherObj.country);
    $("#weather").html(weatherObj.currently);
    $("#wind").html(weatherObj.windSpeed + " " + weatherObj.windSpeedUnits);
}

// fDataHandler
fDataHandler = function (location, woeid) {
    $.simpleWeather({
        // Get data
        location: location,
        woeid: woeid,
        unit: 'f',
        success: function(weather) {
            weatherObj.icon = weather.code;
            weatherObj.temperature = weather.temp;
            weatherObj.temperatureUnits = "F";
            weatherObj.country = weather.country;
            weatherObj.region = weather.region;
            weatherObj.city = weather.city;
            weatherObj.currently = weather.currently;
            weatherObj.windSpeed = weather.wind.speed;
            weatherObj.windSpeedUnits = weather.units.speed;

            // display data
            fDisplayData(weatherObj);

            // Toggle units
            $("#units-toggle-btn").click(function () {
                weatherObj.temperatureUnits = (weatherObj.temperatureUnits == "F") ? "C":"F";
                weatherObj.temperature = (weatherObj.temperature == weather.temp) ? weather.alt.temp:weather.temp;
                $("#temperature").html('<strong>' + weatherObj.temperature + '</strong>');
                $("#temperature-units").html('<strong>' + weatherObj.temperatureUnits + '</strong>');
            });
        },
        error: function(error){
            console.log(error);
        }
    });
}

$(document).ready(function () {
    fRunGeolocation();
});
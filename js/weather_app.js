$(document).ready(function() { 

    /**
     * Requests JSON data from OpenWeather API using given JSON-style string and
     * sets document HTML output.
     * @param {string} data
     */
    function buildJson(data) {
        const weatherAPI = "http://api.openweathermap.org/data/2.5/weather";
        let weatherHTML = '';
        $.getJSON(weatherAPI, JSON.parse(data),
            function(json) {
                weatherHTML += "<div id='weather-icon'><img src='http://openweathermap.org/img/w/" 
                weatherHTML += json['weather'][0].icon + ".png'></div>";
                weatherHTML += "<div id='weather-info'>Weather in " + json['name'] + "<br>" + json['weather'][0].description + '<br />';
                weatherHTML += json['main'].temp + " degrees</div>";
                $('#weather-output').html(weatherHTML);
        });
    }

    // Check if geolocation is available in browser. Set message if not.
    if (!("geolocation" in navigator)) {
        $('#geolocate').text('Not Available');
        return;
    }

    $('.city').click(function(e) {
        
        let dataString = '{ "appid": "", "units": "imperial"';
        let city = "";

        // Create the dataString for the JSON request depending of user selected predetermined city
        // or their current location
        if (e.target.id == 'geolocate') {
        
            // Gets longitude and latitude variables on geolocation success
            function success(pos) {
                dataString += ', "lat": "' + pos.coords.latitude + '",  "lon": "' + pos.coords.longitude + '" }';
                $('#weather-output').html(buildJson(dataString));
            };

            function error(err) {
                console.warn('ERROR: ' + err.code + ' - ' + err.message);
                $('#weather-output').html('Could not acquire your location.');
            };
            navigator.geolocation.getCurrentPosition(success, error);

        } else {
            dataString += ', "q": "' + $(e.target).text() + '" }';
            $('#weather-output').html(buildJson(dataString));
        } 
    }); //end click handler
}); //end ready

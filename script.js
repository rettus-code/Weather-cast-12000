$(document).ready(function() {
    var wData = {
      cityName: "",
      lat: null,
      long: null,
      conditions: "",
      wind: "",
      temp: "",
      humid: "",
      uvI: "",

    }
      https://rawgit.com/moment/moment/2.2.1/min/moment.min.js
      var userEntry = prompt("Enter zipcode or city name.");
      var now = weather("weather");
      var future = weather("forecast");


    function weather(state){
    var queryURL = "https://api.openweathermap.org/data/2.5/" + state + "?q="+userEntry +"&appid=209f024f18b94911ca5d243388fea797";
    
      $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) { 
          console.log(response);
          if (state === "weather"){
            var time = moment().format('llll');
            $("#currCity").text(response.name+ "  ");
            $("#currCity").append(time);
            wData.lat = response.coord.lat;
            wData.long = response.coord.lon;
            $("#icon").append(iconSelector(response.weather[0].icon));       
            $("#cWind").text("wind Speed: " + response.wind.speed +" mph");
            $("#cTemp").text("Temperature: " + ((response.main.temp -273.15)/5*9 + 32).toFixed(1) +" F");
            $("#cHum").text("Humidity: " + response.main.humidity +"%");
            uvIndex(state);
            current();
        } else {
          for (var i = 0; i < 5; i++){
            var dt = response.list[i*8].dt_txt.split(" ")
            $("#" + i + "card-header").text(dt[0]);
            $("#" + i + "card-header").text(dt[0]);
            $("#" + i + "card-header").text(dt[0]);
            $("#" + i + "card-header").text(dt[0]);
            var temp = response.list[i*8].main.temp-273.15;
            $("#" + i + "temp").text((temp/5*9+32).toFixed(1) +" F");
            $("#" + i + "temp").text((temp/5*9+32).toFixed(1) +" F");
            $("#" + i + "temp").text((temp/5*9+32).toFixed(1) +" F");
            $("#" + i + "temp").text((temp/5*9+32).toFixed(1) +" F");
            var hum = response.list[i*8].main.humidity;
            $("#" + i + "hum").text(hum +"%");
            $("#" + i + "hum").text(hum +"%");
            $("#" + i + "hum").text(hum +"%");
            $("#" + i + "hum").text(hum +"%");
          }
        }
    });
    }
     function uvIndex(state) {
      if (state === "weather"){
        queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=209f024f18b94911ca5d243388fea797&lat=" + wData.lat + "&lon="+wData.long;
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(respond) {
          $("#cUV").text("UV Index: " + respond.value);
      }) 
    }
  }
  function iconSelector(img){
    var icon = $("<img>");
    var iconUrl = "http://openweathermap.org/icon/wn/";   
    icon.attr("src", iconUrl + img + "@2x.png");
    return icon;
}

  })
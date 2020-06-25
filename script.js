$(document).ready(function() {
    var wData = {
      cityName: "",
      lat: null,
      long: null,
      conditions: "",
      temp: "",
      humid: "",
      uvI: "",

    }
      var userEntry = prompt("Enter zipcode or city name.");
      console.log(userEntry);
      var current = weather("weather");
      //var future = weather("forecast");


    function weather(state){
    var queryURL = "https://api.openweathermap.org/data/2.5/" + state + "?q="+userEntry +"&appid=209f024f18b94911ca5d243388fea797";
      $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {         
          wData.cityName = response.name;
          wData.lat = response.coord.lat;
          wData.long = response.coord.lon;       
          wData.conditions = response.weather[0].description;
          wData.temp =  (response.main.temp -273.15).toFixed(1);
          wData.humid = response.main.humidity;
          uvIndex(state);
          //wData.uvI = uvi;
          console.log(wData);
        });         
    }
     function uvIndex(state) {
      if (state === "weather"){
        console.log(wData);
        queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=209f024f18b94911ca5d243388fea797&lat=" + wData.lat + "&lon="+wData.long;
        console.log(queryURL);
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(respond) {
          wData.uvI = respond.value;
          console.log(respond);
      }) 
    } else {
      queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=209f024f18b94911ca5d243388fea797&lat=" + wData.lat + "&lon="+ wData.long + "&cnt=5";
        console.log(queryURL);
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(respond) {
          wData.uvI = respond.value;
          console.log(respond);
    })
    }
  };
})
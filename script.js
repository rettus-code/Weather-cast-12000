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
    var cityBox = $(".cityData");
      https://rawgit.com/moment/moment/2.2.1/min/moment.min.js
      //var userEntry = prompt("Enter zipcode or city name.");
     // var now = weather("weather");
      //var future = weather("forecast");
      var count = 0;
      var cityStorage = [];
//When input Button is clicked, new city button is added to page
      var srch = $("#srch")
      var userEntry = "";
      $("#input").on("click", function(){
        event.preventDefault();
        console.log("click");
        userEntry = (srch.val());
        console.log(userEntry);
        count++;
        localStorage.setItem(("#" + count), userEntry)
      /*var cityBtn = $("<button>");
      cityBtn.text(userEntry);
      cityBtn.attr("class","cityBtn");
      $("#"+ count + "s").append('<input type="button" id="btn"'+count+' class="btn btn-primary" value="Add Class" />')
      console.log("#"+ count + "s");
      cityStorage.unshift(cityBtn)
      console.log(cityStorage);
      for (var k = 0; k < cityStorage.length; k++){
        $("#"+ k + "s").append(cityStorage[k])
      }*/
    
    var now = weather("weather");
    var future = weather("forecast");
    })
    previousSearch();
    
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
            $("#icon").empty(iconSelector(response.weather[0].icon));       
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
            var temp = response.list[i*8].main.temp-273.15;
            $("#" + i + "temp").text((temp/5*9+32).toFixed(1) +" F");
            var hum = response.list[i*8].main.humidity;
            $("#" + i + "hum").text(hum +"%");
            var icons = response.list[i*8].weather[0].icon;
            $("#" + i + "icon").empty(iconSelector(icons));
            $("#" + i + "icon").append(iconSelector(icons));
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
          var uvi = respond.value;
          $("#cUV").text("UV Index: " + uvi);
          console.log(respond);
         if (uvi <= 3){
           $("#cUV").css({"background-color" : "green", "color" : "black"});
         }
         if (uvi > 3 && uvi <= 6){
           $("#cUV").css({"background-color" : "yellow", "color" : "black"});
         }
         if (uvi > 6 && uvi <= 8){
           $("#cUV").css({"background-color" : "orange", "color" : "black"});
         }
         if (uvi > 8){
           $("#cUV").css({"background-color" : "red", "color" : "white"});
         }
      }) 
    }
  }
  function iconSelector(icon){
    var iconImg = $("<img>");
    var iconUrl = "http://openweathermap.org/img/wn/";   
    iconImg.attr("src", iconUrl + icon + "@2x.png");
    return iconImg;
}
function previousSearch(){
  console.log("previous")
  var values = [],
        keys = Object.keys(localStorage);
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }
    console.log(values)
    for (j=0; j<8; j++){
    var srchs = $("<li>");
    srchs.addClass("collection");
    var cityBtn = $("<button>")
    cityBtn.text(values[j]);
    cityBtn.attr("id", j+"");
    cityBtn.addClass("cityBtn")
    cityBtn.on("click",function(event){
      event.preventDefault();
      userEntry = $(this).text();
      console.log(userEntry)
      weather("weather");
      weather("forecast");
  })
   srchs.append(cityBtn);
   cityBox.append(srchs);
 
}
}
})
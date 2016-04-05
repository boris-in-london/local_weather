// Style guide(Idiotmatic.js) can be found here:
// https://github.com/rwaldron/idiomatic.js.
// Weather API Key = d901c95e6d0b4ab619c79b405f20d86c;
"use strict"


// whatTemp is a module that can be used to convert celcius temprature to
// fahrenheit temprature then send that info to an html element. It takes
// a number temprature (temp) and a string (htmEle) as arguments.
let whatTemp = (() => {
  let pub = {};

  pub.fahren = function convert( temp, htmlEle ) {
    let fahrenheit;
    let tempEle = document.getElementsByClassName( htmlEle )[0];
    fahrenheit = temp * 9/5 + 32;
    tempEle.innHTML = `Temprature: ${fahrenheit}`;
  }

  pub.celsi = function dontConvert( temp, htmlEle ) {
    let tempEle = document.getElementsByClassName( htmlEle )[0];
    tempEle.innerHTML = `Temprature: ${temp}`;
  };

  return pub;
})();


// doItAll is the main executer function, which we use to organize our code,
// calling modules and functions within it. It contains the main API call
// to OpenWeather.com, which fetches an object with weather details.
function doItAll( pos ) {
  let weatherObj;
  let tempEle = "weather-temp";
  let symbolEle = "weather-symbol";
  let cityEle = "weather-city";
  let detailsEle = "weather-details";
  let unit = "metric";
  let weatherUrl =
  `http://api.openweathermap.org/data/2.5/weather?` +
  `lat=${pos.coords.latitude}&lon=${pos.coords.longitude}` +
  `&APPID=d901c95e6d0b4ab619c79b405f20d86c&units=${unit}`;

  // Our API call to Openweather.com.
  $.getJSON( weatherUrl, json => {
      weatherObj = Object.create( json );
      whatCity( weatherObj.name, weatherObj.sys.country, cityEle );
      whatTemp.celsi( weatherObj.main.temp, tempEle );
      console.log( json );
    }
  );
}


function ifErr( err ) {
  console.log( err );
}


function whatCity( city, country, htmlEle ) {
  let cityEle = document.getElementsByClassName( htmlEle )[0];

  cityEle.innerHTML = `Location: ${city} ${country}`;
};


function whatIcon(){};


function celiOrFahren(){};

//  This is where it all starts, Geolocation is a built in API used to identify
// a clients location,  if Geolocation is available it returns longitude and
// latitude cooridents which we pass into our doIAll functioun, which does it
// all.
if ( "geolocation" in navigator ) {
  navigator.geolocation.getCurrentPosition( doItAll, ifErr );
} else {
  alert("In order for this app to work correctly, enable location");
}

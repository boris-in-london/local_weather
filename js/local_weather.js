// Style guide(Idiotmatic.js) can be found here:
// https://github.com/rwaldron/idiomatic.js.
// Weather API Key = d901c95e6d0b4ab619c79b405f20d86c;
"use strict"


// whatTemp is a module that can be used to convert celcius temprature to
// fahrenheit temprature. It takes a number (temp) as an argument.  The reason
// this is a module and not a function is because i was hoping to do a lot more
// with this module,  i may still.
let whatTemp = (() => {
  let pub = {};

  pub.fahren = function convert( temp ) {
    let fahrenheit = temp * 9/5 + 32;

    return fahrenheit;
  };

  pub.celsi = function dontConvert( temp ) {

    return temp;
  };

  return pub;
})();


// doItAll is the main executer function, which we use to organize our code,
// calling modules and functions within it. It contains the main API call
// to OpenWeather.com, which fetches an object with weather details/info.
function doItAll( pos ) {
  let tempEle = "weather-temp";
  let symbolEle = "weather-symbol";
  let cityEle = "weather-city";
  let detailsEle = "weather-details";
  let unit = "metric";
  let weatherUrl =
  `https://api.openweathermap.org/data/2.5/weather?` +
  `lat=${pos.coords.latitude}&lon=${pos.coords.longitude}` +
  `&APPID=d901c95e6d0b4ab619c79b405f20d86c&units=${unit}`;

  // Our API call to Openweather.com.
  $.getJSON( weatherUrl, json => {
      let  weatherObj = Object.create( json );
      let detailsObj = weatherObj.weather[0].description;
      let symbolTempy = `wi-owm-${weatherObj.weather[0].id}`;
      let btnEle = document.getElementsByName("my-checkbox");
      let celsiVar = Math.round( weatherObj.main.temp );
      let fahrVar = Math.round( whatTemp.fahren( weatherObj.main.temp ) );
      $.fn.bootstrapSwitch.defaults.onText = "&#8451;";
      $.fn.bootstrapSwitch.defaults.offText = "&#8457;";
      $.fn.bootstrapSwitch.defaults.offColor = "danger";
      $.fn.bootstrapSwitch.defaults.size = "large";
      $.fn.bootstrapSwitch.defaults.labelWidth = "0";
      document.getElementsByClassName( tempEle )[0].innerHTML = celsiVar;
      document.getElementsByClassName( detailsEle )[0].innerHTML = detailsObj;

      whatIcon(symbolEle, symbolTempy);
      whatCity( weatherObj.name, weatherObj.sys.country, cityEle );

      $("[name='my-checkbox']").bootstrapSwitch();

      $("[name='my-checkbox']").on("switchChange.bootstrapSwitch", ( e, s ) =>
      {
        if ( !$("[name='my-checkbox']").bootstrapSwitch("state") ) {
          document.getElementsByClassName( tempEle )[0].innerHTML = fahrVar;
        } else {
          document.getElementsByClassName( tempEle )[0].innerHTML = celsiVar;
        }
      });
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


function whatIcon( x, y ){
  document.getElementsByClassName( x )[0].classList.add( y );
};
//  This is where it all starts, Geolocation is a built in API used to identify
// a clients location,  if Geolocation is available it returns longitude and
// latitude cooridents which we pass into our doItAll functioun, which does it
// all.
if ( "geolocation" in navigator ) {
  navigator.geolocation.getCurrentPosition( doItAll, ifErr );
} else {
  alert("In order for this app to work correctly, enable location");
}

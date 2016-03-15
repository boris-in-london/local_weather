// Style guide(Idiotmatic.js) can be found here:
// https://github.com/rwaldron/idiomatic.js.


var loLaPo = function () {
  var weatherHtml =
  document.getElementsByClassName("weather-location")[0].innerHTML;
  var gotPos = pos =>
    ({ long: pos.coords.longitude, lat: pos.coords.latitude });

  if ( navigator.geolocation ) {
    var coordis = navigator.geolocation.getCurrentPosition( gotPos );
      weatherHtml = `longatutude is
      ${coordis.long} and latitude is ${coordis.lat}`;
  } else {
    weatherHtml = "Geolocation" +
    " is not supported by this browser.";
  }
}

loLaPo();

// Style guide(Idiotmatic.js) can be found here:
// https://github.com/rwaldron/idiomatic.js.
if ( "geolocation" in navigator ) {
  navigator.geolocation.getCurrentPosition( doItAll, ifErr );
} else {
  alert("In order for this app to work correctly, enable location");
}

function doItAll( pos ) {
  coordiOf = {
    long: pos.coords.longitude,
    lat: pos.coords.latitude
  };
  console.log( coordiOf.long );
  console.log( coordiOf.lat );
}

function ifErr( err ) {
  console.log( err );
}

function whatCity(){};
function whatIcon(){};
function celiOrFahren(){};

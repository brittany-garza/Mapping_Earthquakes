// Add console.log to check to see if our code is working.
console.log("working");

let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    accessToken: API_KEY,
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps
let baseMaps = {
    Day: light,
    Night: dark
};

// Create the map object with a center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);
let map = L.map("mapid", {
    center: [44.0, -80.0],
    zoom: 2,
    layers: [dark],
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'streets' tile layer to the map
//streets.addTo(map);

// Get data from cities.js
let torontoData = "https://raw.githubusercontent.com/brittany-garza/Mapping_Earthquakes/main/torontoRoutes.json";

// Create a style for the lines.
let myStyle = {
    color: "#ffffa1",
    weight: 2
}

// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
    // want to inclue airport code and name in pop up
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    //   color: '#ffffa1',
    //   weight: '2',
    style: myStyle,
    onEachFeature: function (element, layer) {
        slayer.bindPopup('<h2>Airport line: ' + element.properties.airline + '</h2><hr>' + '<h3>Airport name: ' + element.properties.dst + '</h3>')
      }
  }).addTo(map);
});

// L.geoJSON(airportData,{
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng)
//         //.bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>")
//         .bindPopup("<h2> Airport code: " + feature.properties.faa + "</h2> <hr> <h3> Airport name: " + feature.properties.name + "</h3>")
//     }
// }).addTo(map);




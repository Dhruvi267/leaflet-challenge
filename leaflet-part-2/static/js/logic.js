// Create the 'basemap' tile layer that will be the background of our map.
let basemap = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the 'satellite' tile layer for satellite view using the Esri Imagery service
let satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
  attribution: "Tiles &copy; Esri"
});

// Create the 'street' tile layer for street view using OpenStreetMap
let street = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
  minZoom: 3,
  layers: [basemap] // Default layer
});

// Add the 'basemap' tile layer to the map.
basemap.addTo(map);

// OPTIONAL: Create the layer groups for earthquakes and tectonic plates.
let earthquakes = L.layerGroup();
let tectonicPlates = L.layerGroup();

// Create base maps with different backgrounds (basemap, street, satellite).
let baseMaps = {
  "Basemap": basemap,
  "Street Map": street,
  "Satellite": satellite // Add satellite view here
};

// Create overlay maps for earthquake and tectonic plates.
let overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates
};

// Add a control to the map that will allow the user to change which layers are visible.
L.control.layers(baseMaps, overlayMaps).addTo(map);

// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson")
  .then(function (data) {
    // Function to determine the color based on depth
    function getColor(depth) {
      return depth > 90 ? "#ff5f65" :
             depth > 70 ? "#fca35d" :
             depth > 50 ? "#fdb72a" :
             depth > 30 ? "#f7db11" :
             depth > 10 ? "#dcf400" : "#a3f600";
    }

    // Function to determine the radius based on magnitude
    function getRadius(magnitude) {
      return magnitude ? magnitude * 4 : 1;
    }

    // Function to define marker style
    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 0.8,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }

    // Add GeoJSON data to map with markers
    L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng);
      },
      style: styleInfo,
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          "Magnitude: " + feature.properties.mag +
          "<br>Depth: " + feature.geometry.coordinates[2] +
          " km<br>Location: " + feature.properties.place
        );
      }
    }).addTo(earthquakes);

    // Add earthquake layer to map
    earthquakes.addTo(map);

    // Create a legend for the map
    let legend = L.control({
      position: "bottomright"
    });

    legend.onAdd = function () {
      let div = L.DomUtil.create("div", "info legend");
      let depths = [-10, 10, 30, 50, 70, 90];
      let colors = ["#a3f600", "#dcf400", "#f7db11", "#fdb72a", "#fca35d", "#ff5f65"];
      for (let i = 0; i < depths.length; i++) {
        div.innerHTML += "<i style='background:" + colors[i] + "'></i> " +
          depths[i] + (depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+");
      }
      return div;
    };

    // Finally, add the legend to the map.
    legend.addTo(map);
  })
  .catch(function (error) {
    console.error("Error loading the earthquake data: ", error);
  });

// OPTIONAL: Add Tectonic Plates data
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
  .then(function (plate_data) {
    L.geoJson(plate_data, {
      color: "orange",
      weight: 2
    }).addTo(tectonicPlates);

    tectonicPlates.addTo(map);
  })
  .catch(function (error) {
    console.error("Error loading the tectonic plates data: ", error);
  });

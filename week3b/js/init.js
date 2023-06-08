
// declare the variables
let mapCenter = [13,-89]
const zoom = 5

let esri_basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
	maxZoom: 13
});

// declare the map and use the variables above
const map = L.map('the_map').setView(mapCenter, zoom);
esri_basemap.addTo(map)



console.log("Hi Jonathan") 
fetch("map.geojson")
    .then(response => {
        console.log (response)
        return response.json();
    })
    .then(data =>{
        console.log (data)

        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, {
            pointToLayer: (feature, latlng) => { 
                return L.circleMarker(latlng, {color: feature.properties.color})
            }
        }).bindPopup(layer => {
            return layer.feature.properties["Place "];
        }).addTo(map);
        
    });













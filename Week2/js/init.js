


let esri_basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
	maxZoom: 13
});

// Second map
const eatingmap = L.map('the_map2').setView([34.0709, -118.444], 1);

//JavaScript let variable declaration to create a marker
let eat1 = L.marker([37.0709, -118.444]).addTo(eatingmap) 
        .bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> is the lab where I work in ')
        .openPopup();
// Leaflet tile layer, i.e. the base map
esri_basemap.addTo(eatingmap); 



// Third map
const placesvisit  = L.map('the_map3').setView([34.0709, -118.444], 10);
// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(placesvisit); 


// create a function to add markers
function addMarker(lat,lng,title,message,map){
    let targetmap
    if(map=="eating"){
    targetmap=eatingmap

    }
    if(map=="visit"){
        targetmap=placesvisit
    
        }
    L.marker([lat,lng]).addTo(targetmap).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

addMarker(37, -110, "Location 1", "Hello, From Location 1", "visit" ) 
addMarker(37, -110, "Location 1", "Hello, From Location 1", "eating" ) 

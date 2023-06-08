


let esri_basemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri',
	maxZoom: 13
});

// Second map
const eatingmap = L.map('the_map2').setView([33.98915169248797, -118.26572013289189], 10);

//JavaScript let variable declaration to create a marker
let eat1 = L.marker([33.98915169248797, -118.26572013289189]).addTo(eatingmap) 
        .bindPopup('Tacos El Poblanos<br> This area in general has the best tacos in LA')
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
    createButtons(lat,lng,title); 
    }
    if(map=="visit"){
        targetmap=placesvisit
    
        }
    L.marker([lat,lng]).addTo(targetmap).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

addMarker(34.01515345015369, -118.3087611157807, "Paseo San Miguel", "Well known chain that serves authentic salvadorean food", "eating" ) 
addMarker(34.05855647658122, -118.27228961422973,"Guatemalan Night market", "A unique street food area where vendor sell authentic guatemalan food", "eating")

//function for buttons
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        eatingmap.flyTo([lat,lng]); 
    })
    document.getElementById("contents").appendChild(newButton); 
}









// adding markers to my map that shows where my family is from
addMarker(13.842151285939588, -88.85539440687805, "Illobasco, El Salvador", "This is where my grandma is from. My mom would spend a lot of time here", "placesvisit")
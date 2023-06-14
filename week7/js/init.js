// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':10}

// our Leaflet feature group layers waiting for content!
let English = L.featureGroup();
let Spanish = L.featureGroup();

let layers = {
    "English": English,
    "Spanish": Spanish
}

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

// add layer control box
L.control.layers(null,layers).addTo(map)

let Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});



L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

Stadia_AlidadeSmoothDark.addTo(map);

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-yQ0fEIhxjbp0cn8-qxeGk-4NW0Uw9GMGNAeuueVwWTLEc52A3U8LN6dt65deBNkhBuxBXx0UigsG/pub?output=csv"




function loadData(dataUrl){
    Papa.parse(dataUrl, {
      header: true,
      download: true,
      complete: results => processData(results) // Call processData with the parsed results
    });
  }
  

  function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    English.addTo(map) // add our layers after markers have been made
    Spanish.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([English,Spanish]);
    map.fitBounds(allLayers.getBounds());
}


function addMarker(data){
    if(data['What Language do you primarily speak at home?' ] == "English"){
        circleOptions.fillColor = "red"
        English.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>English</h2>
        <p><strong>What language do you primarily speak at home?</strong><br>${data['What Language do you primarily speak at home?']}</p>
        <p><strong>Location of encounter:</strong><br>${data['Location of encounter with police. ']}</p>
        <p>${data['What happened during this encounter with the police? Example: Pulled over for having a broken tail light. ']}</p>`))
        createButtons(data.lat,data.lng,data['Location of encounter with police. ']);
    }
    else{
        circleOptions.fillColor = "blue"
        Spanish.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>Spanish</h2><p><strong>What language do you primarily speak at home?</strong><br>${data['What Language do you primarily speak at home?']}</p>
        <p><strong>Location of encounter:</strong><br>${data['Location of encounter with police. ']}</p><p>${data['What happened during this encounter with the police? Example: Pulled over for having a broken tail light. ']}</p>`))
        createButtons(data.lat,data.lng,data['Location of encounter with police. ']);
    }
    return data
}
loadData(dataUrl) 




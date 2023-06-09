// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
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
    results.data.forEach(data => {
      console.log(data); // For debugging: check if each data is logged correctly
      addMarker(
        data.lat,
        data.lng,
        data['Location of encounter with police. '],
        data['What happened during this encounter with the police? Example: Pulled over for having a broken tail light. ']
      );
    });
   }
  
  


loadData(dataUrl) 
















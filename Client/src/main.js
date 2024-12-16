import * as L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { HeaderView } from "./ui/header/index.js";
import { Candidats } from "./data/data-candidats.js";
import { Lycees } from "./data/data-lycees.js";

import './index.css';



let C = {};

C.init = async function(){
    V.init();
    console.log(Candidats.getAll());
    console.log(Lycees.getAll());
    console.log(Lycees.getLycee());
}

let V = {
    header: document.querySelector("#header")
};

V.init = function(){
    V.renderHeader();
    V.renderMap();
}

V.renderHeader= function(){
    V.header.innerHTML = HeaderView.render();
}
V.renderMap= function(){
    var map = L.map('map').setView([45.835783764063905, 1.2311845477920846], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 25,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        var marker = L.marker([45.835783764063905, 1.2311845477920846]).addTo(map);
        var circle = L.circle([45.835783764063905, 1.2311845477920846], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map);
        console.log(circle);
//         var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map);
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");
var popup = L.popup()
    .setLatLng([45.835783764063905, 1.2311845477920846])
    .setContent("I am a standalone popup.")
    .openOn(map);
    var popup = L.popup();

    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }
    
    map.on('click', onMapClick);
}
V.renderLycee= function(){

    var markerLycee = L.marker([45.835783764063905, 1.2311845477920846]).addTo(map);
}
C.init();
import * as L from "leaflet";
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import { HeaderView } from "./ui/header/index.js";
import { MapView} from "./ui/Map/index.js";
import { Candidats } from "./data/data-candidats.js";
import { Lycees } from "./data/data-lycees.js";

import './index.css';



let C = {

};
C.init = async function(){
    V.init();
    C.setupEventListeners();
}

// C.init = async function(){
//     V.init();

// }

let V = {
    header: document.querySelector("#header")
};

V.init = function(){
    V.renderHeader();
    Candidats.getDiplomeAcquis();
    // V.renderLyceeByCandidate();
    console.log(Candidats.getNbEleveSpe('0870669E'));

}

V.renderHeader= function(){
    V.header.innerHTML = HeaderView.render();
}

V.resetMap = function() {
    let mapContainer = document.getElementById('map');
    mapContainer.remove(); // Remove the map container
    let newMapContainer = document.createElement('div'); // Create a new map container
    newMapContainer.id = 'map'; // Set the id to 'map'
    document.body.appendChild(newMapContainer); // Append the new map container to the body
}

// V.renderLyceeByCandidate= function(){
//     let result = Candidats.getNeoBach();

//     MapView.render(result);
//     console.log(result);

// }
C.setupEventListeners = function() {
    document.querySelector("#btnNouveauBachelier").addEventListener("click", function() {
        V.resetMap();
        console.log("click");
        let resultNeo = Candidats.getNeoBach();
        console.log(resultNeo);
        MapView.render(resultNeo);
    });

    document.querySelector("#btnAncienBachelier").addEventListener("click", function() {
        V.resetMap();
        let resultAncien = Candidats.getAncienBach();
        MapView.render(resultAncien);
        console.log(resultAncien);
    });

    document.querySelector("#btnTous").addEventListener("click", function() {
        let resultTous = Candidats.getTous();
        MapView.render(resultTous);
        console.log(resultTous);
    });
}




C.init();
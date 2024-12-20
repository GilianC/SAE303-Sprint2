import * as L from "leaflet";
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import { HeaderView } from "./ui/header/index.js";
import { MapView} from "./ui/Map/index.js";
import { Candidats } from "./data/data-candidats.js";
import { Lycees } from "./data/data-lycees.js";

import { GraphView } from "./ui/Graph/index.js";
import './index.css';



let C = {

};
C.init = async function(){
    V.init();
    C.setupEventListeners();
}



let V = {
    header: document.querySelector("#header"),
    graph: document.querySelector("#graph")
    
};

V.init = function(){
    V.renderHeader();
    Candidats.getDiplomeAcquis();
    // V.renderLyceeByCandidate();


}

V.renderHeader= function(){
    V.header.innerHTML = HeaderView.render();
}
V.renderGraph = function(){
    document.querySelector("#graph").innerHTML = GraphView.render();
    // V.graph.innerHTML = GraphView.render();
    
}
V.resetMap = function() {
    let mapContainer = document.getElementById('map');
    mapContainer.remove();
    let newMapContainer = document.createElement('div'); 
    newMapContainer.id = 'map';
    let box = document.querySelector("#boxC");
    box.appendChild(newMapContainer);
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
        V.renderGraph();
        Candidats.getLyceeToDepartement();
        let chart = Candidats.getLyceeToDepartement();
        GraphView.renderGraph(chart);
        // console.log(Candidats.getChartForNeoBach());
        document.querySelector('#slider-name').addEventListener('input', function(event) {
            const threshold = event.target.value; 
            document.getElementById('slider').innerText = threshold; 
            GraphView.renderGraph(); 
        });
    });

    document.querySelector("#btnAncienBachelier").addEventListener("click", function() {
        V.resetMap();
        let resultAncien = Candidats.getAncienBach();
        MapView.render(resultAncien);
        console.log(resultAncien);
        V.renderGraph();
        Candidats.getLyceeToDepartement();
        let chart = Candidats.getDepartementPostBac();
        GraphView.renderGraph(chart);
    });
    document.querySelector("#btnTous").addEventListener("click", function() {
        let resultTous = Candidats.getTous();
        MapView.render(resultTous);
        console.log(resultTous);
    });

}




C.init();
import * as L from "leaflet";
import 'leaflet.markercluster';
import 'leaflet/dist/leaflet.css';
import { HeaderView } from "./ui/header/index.js";
import { Ite5} from "./ui/ite-5/index.js";
import { Candidats } from "./data/data-candidats.js";
import { Lycees } from "./data/data-lycees.js";

import './index.css';



let C = {};

C.init = async function(){
    V.init();

}

let V = {
    header: document.querySelector("#header")
};

V.init = function(){
    V.renderHeader();

    V.renderLyceeByCandidate();

}

V.renderHeader= function(){
    V.header.innerHTML = HeaderView.render();
}

V.renderLyceeByCandidate= function(){
    let result = Lycees.getLycee();

    Ite5.render(result);
    console.log(result);

}
C.init();
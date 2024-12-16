import * as L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { HeaderView } from "./ui/header/index.js";
import { Ite5} from "./ui/ite-5/index.js";
import { Candidats } from "./data/data-candidats.js";
import { Lycees } from "./data/data-lycees.js";

import './index.css';



let C = {};

C.init = async function(){
    V.init();
    // console.log(Candidats.getAll());
    // console.log(Lycees.getAll());
    // console.log(Lycees.getLycee());
}

let V = {
    header: document.querySelector("#header")
};

V.init = function(){
    V.renderHeader();
    // V.renderMap();
    // V.renderLycee();
    V.renderLyceeByCandidate();
    
}

V.renderHeader= function(){
    V.header.innerHTML = HeaderView.render();
}
// V.renderMap= function(){
   
//         V.renderLycee(map);

// }
// V.renderLycee= function(){
//     let data = Lycees.getLycee();
//     Ite4.render(data);

// }
V.renderLyceeByCandidate= function(){
    let data = Lycees.getLycee();
    let cand = Candidats.getLycee();
    Ite5.render(data,cand );
    console.log()

}
C.init();
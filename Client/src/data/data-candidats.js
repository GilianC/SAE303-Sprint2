

let data = await fetch("./src/data/json/candidatures.json");
data = await data.json();

import { Lycees } from "./data-lycees.js";

let compare = function(a, b) {
    if (a.UAIEtablissementorigine < b.UAIEtablissementorigine) {
        return -1;
    }
    if (a.UAIEtablissementorigine > b.UAIEtablissementorigine) {
        return 1;
    }
    return 0;
}
data.sort(compare);
let Candidats = {}

Candidats.getAll = function(){
    return data;
}

Candidats.binarySearch = function(UAIEtablissementorigine) {
        let left = 0;
        let right = data.length - 1;
        let mid;
        while (left <= right) {
            mid = Math.floor((left + right) / 2);
            if (data[mid].UAIEtablissementorigine == UAIEtablissementorigine) {
                return mid;
            }
            if (data[mid].UAIEtablissementorigine < UAIEtablissementorigine) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return null;
    }
  
  
Candidats.getDiplomeEnPreparation = function() {
    let res = [];
    for (let obj of data) {
        
        if (obj.Baccalaureat.TypeDiplomeLibelle === "Baccalauréat en préparation") {
            res.push(obj);
        }
    }

    return res;
}





Candidats.getByDiplome = function(diplome) {

    let res = [];
    for (let obj of data) {
        if (obj.Baccalaureat.TypeDiplomeLibelle === "Baccalauréat en préparation" && obj.Baccalaureat.Diplome === diplome) {
            res.push(obj);
        }
    }
    return res;




}

Candidats.getNbEleveSpe = function(uai) {
    let count = 0;
    let specialities = { STI2D: 0, Générale: 0, autres: 0 };
    let candidats = Candidats.getDiplomeEnPreparation();
    candidats.forEach(candidat => {
        if (candidat.Scolarite[0].UAIEtablissementorigine === uai) {
            count++;
            let speciality = candidat.Baccalaureat.SerieDiplomeCode;
            if (speciality === "STI2D" || speciality === "Générale") {
                specialities[speciality]++;
            } else {
                specialities.autres++;
            }
        }
    });
    console.log(specialities);
    return { count, specialities };
}
Candidats.getLycee = function() {
    let res = [];
    let candidats = Candidats.getDiplomeEnPreparation();
    candidats.forEach(candidat => {
        let lyceesData = Lycees.getAll();
        let index = Lycees.binarySearch(candidat.Scolarite[0].UAIEtablissementorigine);
        if (index !== null) {
            let obj = lyceesData[index];
            let num = obj.numero_uai;
            let nom = obj.appellation_officielle;
            let lat = parseFloat(obj.latitude);
            let long = parseFloat(obj.longitude);
            if (lat != null && long != null && !isNaN(lat) && !isNaN(long)) {
                let alreadyExists = res.some(item => item[2] === num);
                let count = Candidats.getNbEleveSpe(num);
                if (!alreadyExists) {
                    
                    res.push([lat, long, num, nom, count]);
                }

            }
        }
    });
    return res;
}


export { Candidats };
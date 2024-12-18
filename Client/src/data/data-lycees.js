

let data = await fetch("./src/data/json/lycees.json");
data = await data.json();
import {Candidats} from "./data-candidats.js";


let compare = function(a, b){
    if (a.numero_uai < b.numero_uai){
        return -1;
    }
    if (a.numero_uai > b.numero_uai){
        return 1;
    }
    return 0;
}
data.sort(compare);
let Lycees = {}
Lycees.getAll = function(){ 
    return data;
}

Lycees.binarySearch = function(numero_uai){
    let left = 0;
    let right = data.length - 1;
    let mid;
    while (left <= right){
         mid = Math.floor((left + right) / 2);
        if (data[mid].numero_uai == numero_uai){
            return mid;
        }
        if (data[mid].numero_uai < numero_uai){
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return null;
}

console.log(data);

Lycees.getLycee = function() {
    let res = [];
    let candidats = Candidats.getDiplomeEnPreparation();
    candidats.forEach(candidat => {
        let index = Lycees.binarySearch(candidat.Scolarite[0].UAIEtablissementorigine);
        if (index !== null) {
            let obj = data[index];
            let num = obj.numero_uai;
            let nom = obj.appellation_officielle;
            let lat = parseFloat(obj.latitude);
            let long = parseFloat(obj.longitude);
            if (lat != null && long != null && !isNaN(lat) && !isNaN(long)) {
                let alreadyExists = res.some(item => item[2] === num);
                let count = Lycees.getNbEleveSpe(num);
                if (!alreadyExists) {
                    
                    res.push([lat, long, num, nom, count]);
                }

            }
        }
    });
    return res;
}

// Lycees.getNbEleveLycee = function(uai) {
//     let count = 0;
//     let candidats = Candidats.getDiplomeEnPreparation();
//     candidats.forEach(candidat => {
//         if (candidat.Scolarite[0].UAIEtablissementorigine === uai) {
//             count++;
//         }
//     });
//     return count;
// }
Lycees.getNbEleveSpe = function(uai) {
    let count = 0;
    let specialities = { STI2D: 0, Generale: 0, autre: 0 };
    let candidats = Candidats.getDiplomeEnPreparation();
    candidats.forEach(candidat => {
        if (candidat.Scolarite[0].UAIEtablissementorigine === uai) {
            count++;
            let speciality = candidat.Baccalaureat.SerieDiplomeCode;
            if (speciality === 'STI2D' || speciality === 'Generale') {
                specialities[speciality]++;
            } else {
                specialities['autre']++;
            }
        }
    });
    console.log(specialities);
    return { count, specialities };
}

export { Lycees };


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
// Lycees.getLycee= function(){
//     let res = [];
//     for (let obj of data) {
//         let num = obj.numero_uai;
//         let nom = obj.appellation_officielle;
//         // console.log(nom);
//             let lat = parseFloat(obj.latitude);
//             let long = parseFloat(obj.longitude);
//             res.push([lat, long, num, nom]);
//     }
// console.log(res);
// return res;

// }
//fais la fonction getLycee qui retourne les lycées avec leur latitude et longitude selon leur présence dans la liste des candidats en utilisant getDiplomeEnPreparation de data-candidats.js

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
            if (!alreadyExists) {
                res.push([lat, long, num, nom]);
            }
        }
    }
});
console.log(res);
    return res;

}
export { Lycees };
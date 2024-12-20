

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





export { Lycees };
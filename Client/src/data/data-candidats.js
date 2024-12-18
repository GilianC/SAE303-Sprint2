

let data = await fetch("./src/data/json/candidatures.json");
let code = await fetch("./src/data/json/codepostaux.json");
data = await data.json();
code = await code.json();

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
let compareCode = function(a, b) {
    if (a.code_postal < b.code_postal) {
        return -1;
    }
    if (a.code_postal > b.code_postal) {
        return 1;
    }
    return 0;
}
data.sort(compare);
code.sort(compareCode);
let Candidats = {}

Candidats.getAll = function(){
    return data;
}

Candidats.binarySearchCode = function(code_postal) {
    let left = 0;
    let right = code.length - 1;
    let mid;
    while (left <= right) {
        mid = Math.floor((left + right) / 2);
        if (code[mid].code_postal == code_postal) {
            return mid;
        }
        if (code[mid].code_postal < code_postal) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return null;
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
Candidats.getDiplomeAcquis = function() {
    let res = [];
    for (let obj of data) {
        
        if (obj.Baccalaureat.TypeDiplomeLibelle === "Baccalauréat obtenu") {
            res.push(obj);
        }
    }
    // console.log(res);
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
    
    return { count, specialities };
}
Candidats.getNbElevePostBac = function(uai) {
    let count = 0;
    let specialities = { STI2D: 0, Générale: 0, autres: 0 };
    let candidats = Candidats.getDiplomeAcquis();
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
    return { count, specialities };
}
//getCodePostaux retourne les codes postaux


Candidats.getAncienBach = function() {

        let res = [];
        let index = {};
        let candidats = Candidats.getDiplomeAcquis();
        candidats.forEach(candidat => {
            let cp = parseInt(candidat.Scolarite[0].CommuneEtablissementOrigineCodePostal);
            let dpt = cp.toString().slice(0, 2);
            if (index[dpt] === undefined) {
                index[dpt] = [];
            }
            index[dpt].push(candidat);

            let codeIndex = Candidats.binarySearchCode(cp);
            if (codeIndex !== null) {
                let codeObj = code[codeIndex];
                let codeLat = parseFloat(codeObj.latitude);
                let codeLong = parseFloat(codeObj.longitude);
                let departement = codeObj.nom_departement;
                let codePostal = codeObj.code_postal;
                if (codeLat != null && codeLong != null && !isNaN(codeLat) && !isNaN(codeLong)) {
                    let alreadyExists = res.some(item => item[3] === departement);
                    let count  = Candidats.getNbElevePostBac(candidat.Scolarite[0].UAIEtablissementorigine);
                    if (!alreadyExists) {
                        res.push([codeLat, codeLong, codePostal, departement, count]);
                    }
                }
            }
        });    return res;
    }

Candidats.getNeoBach = function() {
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
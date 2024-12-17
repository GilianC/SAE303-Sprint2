

let data = await fetch("./src/data/json/candidatures.json");
data = await data.json();


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


    // la fonction getDiplomeEnPreparation doit retourner les candidats dont le type de diplome libelle est en préparation

Candidats.getDiplomeEnPreparation = function() {
    let res = [];
    for (let obj of data) {
        if (obj.Baccalaureat.TypeDiplomeLibelle === "Baccalauréat en préparation") {
            res.push(obj);
        }
    }
    // console.log(res);
    return res;
}



// Candidats.getDiplomeEnPreparation = function() {
//     let res = [];
//     for (let obj of data) {
//         console.log(obj);
//         if (obj.Baccalaureat.TypeDiplomeLibelle === "Baccalauréat en préparation") {
//             console.log(obj);
//             let index = Candidats.binarySearch(obj.UAIEtablissementorigine);
//             if (index !== null && data[index].TypeDiplomeLibelle === "Baccalauréat en préparation") {
//                 res.push(data[index]);
//                 console.log(data[index]);
//             }
//         }
//     }
//     console.log(res);
//     return res;
// }





export { Candidats };
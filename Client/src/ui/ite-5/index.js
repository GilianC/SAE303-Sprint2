

let Ite5 = {};

Ite5.render = function(lycee){

    var map = L.map('map').setView([45.835783764063905, 1.2311845477920846], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 25,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    // on vérifie si les lycée de la liste lycee sont présent dans candidate
    let res = [];
    for (let obj of lycee) {
            if ( obj[0] != null && obj[1] != null && !isNaN(obj[0]) && !isNaN(obj[1])) { 
                // console.log(obj[2]);

                res.push(obj[2]);
                L.marker([obj[0], obj[1]]).addTo(map).bindPopup(obj[3] + " avec "   );

            
        }
    }
    console.log(res);
                // Afficher un marqueur seulement pour les lycées présents dans les deux listes

                    




// }
// console.log(res);
// Afficher un marqueur pour chaque Lycée disponible
// for (let obj of lycee) {
//     if (obj[0] != null && obj[1] != null && !isNaN(obj[0]) && !isNaN(obj[1])) {
//         L.marker([obj[0], obj[1]]).addTo(map).bindPopup('Lycée');
//     }
// }
// }
// Afficher un marqueur seulement pour les lycées ayant des candidats
// for (let obj of lycee) {
//     if (obj[0] != null && obj[1] != null && !isNaN(obj[0]) && !isNaN(obj[1]) && candidate.includes(obj[2])) {
//         L.marker([obj[0], obj[1]]).addTo(map).bindPopup('Lycée avec candidat');
//         console.log("oui")
//     }
// }
}

export {Ite5};


let Ite5 = {};



Ite5.render = function (lycee) {
    var map = L.map('map').setView([45.835783764063905, 1.2311845477920846], 6);

    // Ajouter la couche de tuiles OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 25,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Créer un groupe de marqueurs pour les clusters
    var markers = L.markerClusterGroup({ singleMarkerMode: true });

    // Créer un groupe pour les cercles à l'échelle nationale
    var circleLayer = L.layerGroup().addTo(map);

    // Palette de couleurs pour les cercles
    const circleColors = ['red', 'blue', 'green', 'orange', 'purple', 'yellow'];

    // Fonction pour regrouper les lycées par clé donnée (ville, etc.)
    function groupByKey(points, keyIndex) {
        let groupedData = {};

        for (let obj of points) {
            let key = obj[keyIndex]; // Index correspondant à la clé (ville, etc.)
            if (!groupedData[key]) {
                groupedData[key] = { lat: 0, lng: 0, count: 0, name: key };
            }
            groupedData[key].lat += obj[0];
            groupedData[key].lng += obj[1];
            groupedData[key].count++;
        }

        // Calcul des moyennes des coordonnées pour chaque groupe
        for (let key in groupedData) {
            groupedData[key].lat /= groupedData[key].count;
            groupedData[key].lng /= groupedData[key].count;
        }

        return groupedData;
    }

    // Fonction pour mettre à jour les clusters et les cercles
    function updateClusters() {
        var zoomLevel = map.getZoom();
        markers.clearLayers();
        circleLayer.clearLayers(); // Effacer les cercles précédents

        // Définir le rayon en fonction du niveau de zoom
        var circleRadius = 20000 / zoomLevel;  // Le rayon diminue à mesure que le zoom augmente

        if (zoomLevel <= 6) {
            // Niveau national : Regrouper par ville (index 6, à ajuster selon vos données)
            let groupedData = groupByKey(lycee, 6);

            let colorIndex = 0; // Utilisation cyclique des couleurs
            for (let key in groupedData) {
                let city = groupedData[key];

                // Vérifier si les coordonnées sont valides
                if (city.lat && city.lng) {
                    // Ajouter un cercle pour chaque cluster visible
                    let circle = L.circle([city.lat, city.lng], {
                        color: circleColors[colorIndex % circleColors.length], // Couleur cyclique
                        fillOpacity: 0.5, // Opacité de remplissage augmentée
                        radius: circleRadius // Rayon ajusté en fonction du niveau de zoom
                    }).bindPopup('France '+'Nombre de lycées:' + city.count);
                    circleLayer.addLayer(circle);

                    // Ajouter un marqueur pour la ville
                    let marker = L.marker([city.lat, city.lng])
                        .bindPopup('France '+'Nombre de lycées:' + city.count);
                    markers.addLayer(marker);

                    colorIndex++;
                }
            }
        } else if (zoomLevel <= 10) {
            // Niveau régional : Afficher les lycées individuellement (index 3)
            for (let obj of lycee) {
                let marker = L.marker([obj[0], obj[1]])
                    .bindPopup(`Lycée: ${obj[3]}<br>Élèves: ${obj[4]}`);
                markers.addLayer(marker);
            }
        } else {
            // Niveau départemental : Afficher les lycées avec des informations détaillées
            for (let obj of lycee) {
                let marker = L.marker([obj[0], obj[1]])
                    .bindPopup(`<b>${obj[3]}</b><br>Adresse: ${obj[6]}<br>Élèves: ${obj[4]}`);
                markers.addLayer(marker);
            }
        }

        map.addLayer(markers);
        map.addLayer(circleLayer); // Ajouter le layer des cercles à la carte
    }

    // Mise à jour des clusters et des cercles à chaque changement de zoom
    map.on('zoomend', updateClusters);

    // Désactiver le zoom lors d'un clic sur un cluster et ajouter un cercle au centre du cluster
    markers.on('clusterclick', function (event) {
        map.zoomControl.disable(); // Désactive le zoom
        setTimeout(function () {
            map.zoomControl.enable(); // Réactive le zoom après un délai
        }, 2000); // Réactive le zoom après 2 secondes

        // Récupérer la position du cluster cliqué
        var clusterLatLng = event.latlng;

        // Calculer le rayon du cercle à afficher (en fonction du niveau de zoom)
        var zoomLevel = map.getZoom();
        var circleRadius = 20000 / zoomLevel;  // Rayon du cercle
        var circle = L.circle(clusterLatLng, {
            color: 'blue',
            fillOpacity: 0.5,
            radius: circleRadius
        }).bindPopup("Cluster");
        
        // Ajouter le cercle au layer des cercles
        circleLayer.addLayer(circle);
    });

    // Mise à jour initiale
    updateClusters();
};




//     var map = L.map('map').setView([45.835783764063905, 1.2311845477920846], 13);
//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 25,
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(map);


//     // on vérifie si les lycée de la liste lycee sont présent dans candidate
//     let res = [];
//     for (let obj of lycee) {
//             if ( obj[0] != null && obj[1] != null && !isNaN(obj[0]) && !isNaN(obj[1])) { 
//                 // console.log(obj[2]);

//                 res.push(obj[2]);
//                 L.marker([obj[0], obj[1]]).addTo(map).bindPopup(obj[3] + " avec "+ obj[4] + " élèves");
                
            
//         }
//     }
//     console.log(res);




// }

export {Ite5};
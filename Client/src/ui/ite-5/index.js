

let Ite5 = {};

Ite5.render = function (lycee) {
    // Initialiser la carte centrée sur la France
    var map = L.map('map').setView([45.835783764063905, 1.2311845477920846], 6);

    // Ajouter la couche de tuiles OpenStreetMap
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Créer un groupe de clusters
    var markers = L.markerClusterGroup({
        singleMarkerMode: false, // Les markers individuels ne sont pas isolés
        iconCreateFunction: function (cluster) {
            // Compter le nombre de markers dans le cluster
            const count = cluster.getChildCount();

            // Créer une icône personnalisée
            return L.divIcon({
                html: `<div style="background:rgba(50, 150, 250, 0.6);border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:white;font-size:14px;">
                          ${count}
                       </div>`,
                className: 'custom-cluster-icon',
                iconSize: [40, 40]
            });
        }
    });

    // Ajouter les données des lycées sous forme de markers
    lycee.forEach(function (item) {
        const [lat, lng,num ,name, candidat] = item; // Décomposer les données de chaque lycée
        const marker = L.marker([lat, lng])
            .bindPopup(name + " avec : "+candidat + " candidat(s)");
        marker.candidat = candidat; // Ajouter le nombre d'élèves comme propriété du marker
        markers.addLayer(marker);
    });

    // Ajouter une popup à chaque cluster
    markers.on('clusterclick', function (event) {
        const cluster = event.layer;

        // Calculer le nombre total d'élèves dans le cluster
        const totalcandidat = cluster.getAllChildMarkers().reduce((sum, marker) => sum + (marker.candidat || 0), 0);

        // Associer une popup au cluster
        cluster.bindPopup("Nombre total d'élèves dans ce secteur : " + totalcandidat).openPopup();
    });

    // Ajouter le groupe de clusters à la carte
    map.addLayer(markers);
};


export {Ite5};
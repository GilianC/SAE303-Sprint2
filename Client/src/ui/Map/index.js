

let MapView = {};

MapView.render = function (listcandidate) {
  
    var map = L.map('map').setView([45.835783764063905, 1.2311845477920846], 6);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    var markers = L.markerClusterGroup({
        singleMarkerMode: false, 
        iconCreateFunction: function (cluster) {
       
            let count = cluster.getChildCount();
            return L.divIcon({
                html: `<div style="background:rgba(255, 1, 2, 0.6);border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:white;font-size:14px;">
                          ${count}
                       </div>`,
                className: 'custom-cluster-icon',
                iconSize: [40, 40]
            });
        }
    });


    listcandidate.forEach(function (item) {
        let [lat, lng,num ,name, candidat ] = item; 

        let specialities = Object.entries(candidat.specialities);
        let specialitiesName = specialities.map(speciality => `${speciality[0]}: ${speciality[1]}`).join('<br>');  
        // console.log(specialitiesName);
        let marker = L.marker([lat, lng])
            .bindPopup(name + " avec : " + candidat.count + " candidat(s)" + "<br>" + specialitiesName + "<br>");  
        marker.candidat = candidat; 
    markers.addLayer(marker);
});

markers.on('clusterclick', function (event) {
        let cluster = event.layer;


        // let totalcandidat = cluster.getAllChildMarkers().reduce((sum, marker) => sum + (marker.candidat || 0), 0);
        let specialitiesCount = cluster.getAllChildMarkers().reduce((acc, marker) => {
            Object.entries(marker.candidat.specialities).forEach(([speciality, count]) => {
            if (!acc[speciality]) {
                acc[speciality] = 0;
            }
            acc[speciality] += count;
            });
            return acc;
        }, {});

        let specialitiesName = Object.entries(specialitiesCount)
            .map(([speciality, count]) => `${speciality}: ${count}`)
            .join('<br>');



    L.popup()
        .setLatLng(cluster.getLatLng())
        .setContent("Nombre total d'élèves dans ce secteur : " + specialitiesName +"</br>" )
        .openOn(map);
    });
    map.addLayer(markers);
};


export {MapView};
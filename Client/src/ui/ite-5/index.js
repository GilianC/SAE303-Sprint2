

let Ite5 = {};

Ite5.render = function (lycee) {
  
    var map = L.map('map').setView([45.835783764063905, 1.2311845477920846], 6);


    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    var markers = L.markerClusterGroup({
        singleMarkerMode: false, 
        iconCreateFunction: function (cluster) {
       
            const count = cluster.getChildCount();
            return L.divIcon({
                html: `<div style="background:rgba(255, 1, 2, 0.6);border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:white;font-size:14px;">
                          ${count}
                       </div>`,
                className: 'custom-cluster-icon',
                iconSize: [40, 40]
            });
        }
    });


    lycee.forEach(function (item) {
        const [lat, lng,num ,name, candidat ] = item; 
        const specialities = Object.entries(candidat.specialities);
        const specialitiesString = specialities.map(speciality => `${speciality[0]}: ${speciality[1]}`).join('<br>');  
        console.log(specialitiesString);
        const marker = L.marker([lat, lng])
            .bindPopup(name + " avec : " + candidat.count + " candidat(s)" + "<br>" + specialitiesString + "<br>");  
        marker.candidat = candidat; 
    markers.addLayer(marker);
});

markers.on('clusterclick', function (event) {
        const cluster = event.layer;


        // const totalcandidat = cluster.getAllChildMarkers().reduce((sum, marker) => sum + (marker.candidat || 0), 0);



    L.popup()
        .setLatLng(cluster.getLatLng())
        .setContent("Nombre total d'élèves dans ce secteur : " )
        .openOn(map);
    });

   
    map.addLayer(markers);
};


export {Ite5};
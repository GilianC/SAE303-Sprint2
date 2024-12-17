

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
                html: `<div style="background:rgba(50, 150, 250, 0.6);border-radius:50%;width:40px;height:40px;display:flex;align-items:center;justify-content:center;color:white;font-size:14px;">
                          ${count}
                       </div>`,
                className: 'custom-cluster-icon',
                iconSize: [40, 40]
            });
        }
    });


    lycee.forEach(function (item) {
        const [lat, lng, num, name,nbeleve] = item; 
        const marker = L.marker([lat, lng])
            .bindPopup(name+ " avec : " +  nbeleve + " candidat(s)");
        markers.addLayer(marker);
    });

 
    map.addLayer(markers);


    map.on('zoomend', function () {
        updateCircles();
    });


    var circleLayer = L.layerGroup().addTo(map);

    function updateCircles() {

        circleLayer.clearLayers();

 
        markers.eachLayer(function (layer) {
            if (layer instanceof L.MarkerCluster) {
                const latLng = layer.getLatLng();
                const childCount = layer.getChildCount();

  
                const circle = L.circle(latLng, {
                    radius: 5000 + childCount * 100,
                    color: 'red',
                    fillColor: 'rgba(50, 150, 250, 0.4)',
                    fillOpacity: 0.5
                }).bindPopup('Nombre de lycées :' + childCount);
                circleLayer.addLayer(circle);
            }
        });
    }

   
    updateCircles();
};





export {Ite5};
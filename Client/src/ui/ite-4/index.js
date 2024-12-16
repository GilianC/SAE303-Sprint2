

let Ite4 = {};

Ite4.render = function(data){

    var map = L.map('map').setView([45.835783764063905, 1.2311845477920846], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 25,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    for(let obj of data){
        console.log(obj);
        if(obj[0] !=null && obj[1]!=null && !isNaN(obj[0]) && !isNaN(obj[1])){
        L.marker([obj[0], obj[1]]).addTo(map);
        }

    }
}



export {Ite4};


let data = await fetch("./src/data/json/lycees.json");
data = await data.json();

let Lycees = {}

Lycees.getAll = function(){ 
    return data;
}
Lycees.getLycee= function(){
    let res = [];
    for(let obj of data){
        let lat = parseFloat(obj.latitude);
        let long = parseFloat(obj.longitude);
        res.push([lat, long])
    }
    // Assuming you have a map object initialized
   
    return res;
}
export { Lycees };
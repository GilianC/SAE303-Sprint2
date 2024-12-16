

let data = await fetch("./src/data/json/lycees.json");
data = await data.json();

let Lycees = {}

Lycees.getAll = function(){ 
    return data;
}
Lycees.getLycee= function(){
    console.log(data.appellation_officielle);
    return data[2].appellation_officielle;
}
export { Lycees };
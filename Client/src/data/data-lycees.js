

let data = await fetch("./src/data/json/lycees.json");
data = await data.json();

let Lycees = {}

Lycees.getAll = function(){ 
    return data;
}
// Lycees.getLycee= function(){
//     let res = [];
//     for (let obj of data) {
//         let nom = obj.appellation_officielle;
//         // console.log(nom);
//             let lat = parseFloat(obj.latitude);
//             let long = parseFloat(obj.longitude);
//             res.push([lat, long, nom]);
//     }
// console.log(res);
// return res;
Lycees.getLycee= function(){
    let res = [];
    for (let obj of data) {
        let num = obj.numero_uai;
        // console.log(nom);
            let lat = parseFloat(obj.latitude);
            let long = parseFloat(obj.longitude);
            res.push([lat, long, num]);
    }
console.log(res);
return res;

}
export { Lycees };
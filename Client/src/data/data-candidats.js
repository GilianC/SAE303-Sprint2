

let data = await fetch("./src/data/json/candidatures.json");
data = await data.json();

let Candidats = {}

Candidats.getAll = function(){
    return data;
}
Candidats.getLycee= function(){
    let res = new Set();
     for (let obj of data) {
          for (let scolarite of obj.Scolarite) {
                if (scolarite.UAIEtablissementorigine) {
                     let num = scolarite.UAIEtablissementorigine;
                     res.add(num);
                }
          }
     }
     res = Array.from(res);
    // console.log(res);
    return res;

}

export { Candidats };
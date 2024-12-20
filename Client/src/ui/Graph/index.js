
const templateFile = await fetch("src/ui/Graph/template.html");
const template = await templateFile.text();



let GraphView = {
    
    render : function(){
        
        return  template;
    },
    
    renderGraph : function(data){

        // const threshold = parseInt(document.querySelector("#slider").value);

        // // Regrouper les départements avec moins de candidatures que le seuil
        // let groupedData = [];
        // let otherDepartments = { STI2D: 0, Générale: 0, autres: 0, total: 0 };  // Pour regrouper les départements "autres"

        // data.forEach(item => {
        //     const totalCandidates = item[4].STI2D + item[4].Générale + item[4].autres;
        //     if (totalCandidates <= threshold) {
        //         // Si le total des candidats est inférieur ou égal au seuil, on les regroupe
        //         otherDepartments.STI2D += item[4].STI2D;
        //         otherDepartments.Générale += item[4].Générale;
        //         otherDepartments.autres += item[4].autres;
        //         otherDepartments.total += totalCandidates;
        //     } else {
        //         // Sinon, on garde le département
        //         groupedData.push(item);
        //     }
        // });

        // // Si des départements sont regroupés, on ajoute un élément "Autres départements"
        // if (otherDepartments.total > 0) {
        //     groupedData.push([
        //         null, null, null, 'Autres départements', // Latitude, Longitude et code postal non utilisés ici
        //         otherDepartments, otherDepartments.total
        //     ]);
        // }

        data.sort((a, b) => {
            let totalA = a[4].STI2D + a[4].Générale + a[4].autres;
            let totalB = b[4].STI2D + b[4].Générale + b[4].autres;
            return totalB - totalA; // Tri décroissant
        });
        Highcharts.chart(document.querySelector("#container"), {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Nombre d\'élèves par spécialité et par département',
                align: 'left'
            },
            xAxis: {
                categories: data.map(item => item[3]) // Les noms des départements
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Nombre d\'élèves'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: [{
                name: 'STI2D',
                data: data.map(item => item[4].STI2D) // Défaut 0 si spécialité manquante
            }, {
                name: 'Générale',
                data: data.map(item => item[4].Générale)
            }, {
                name: 'Autres',
                data: data.map(item => item[4].autres)
            }]
            
            
        });
        
}

}
export {GraphView};

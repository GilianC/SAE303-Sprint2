
const templateFile = await fetch("src/ui/Graph/template.html");
const template = await templateFile.text();



let GraphView = {
    render : function(){
        
        return  template;
    },
    renderGraph : function(data){
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

import { SaeManager } from './class/saeManager.js';
import { RessourceManager } from './class/ressourceManager.js';
import { CompetenceManager } from './class/competenceManager.js';
import { ACManager } from './class/acManager.js';
import { SemestreManager } from './class/semestreManager.js';
 
 
 
let getJson = async function(str) {
    let response = await fetch(str);
    let json = response.json();
    return json;
}
 
let noFilteredSae = await getJson('json/sae.json');
let noFilteredRessource = await getJson('json/ressources.json');
let noFilteredCompetence = await getJson('json/competences.json');
console.log(noFilteredSae);
console.log(noFilteredRessource);
console.log(noFilteredCompetence);



 
let sae = new SaeManager();
let ressource = new RessourceManager();
let competence = new CompetenceManager();
let apcr = new ACManager();
let semestreManager = new SemestreManager();

console.log(sae);
console.log(ressource);
// console.log(competence);
console.log(apcr);
// console.log(semestreManager);

 
let createManager = function() {
    let listSae = []
    noFilteredSae.forEach(sae => {
        let id = sae.id;
        let compet = [];
        sae.apcSaeCompetences.forEach(comp => {
            compet.push(comp.competence.id);
        });
        let matiere = sae.codeMatiere;
        let semestre = sae.semestre.id;
        let ac=[];
        sae.apcSaeApprentissageCritiques.forEach(acs => {
            ac.push(acs.apprentissageCritique.id)
        });
        listSae.push({id, compet, matiere, semestre, ac});
       
    });
    sae.addSae(listSae);
     
     
    let listRessource = []
    noFilteredRessource.forEach(ress => {
        let id = ress.id;
        let compet = [];
        ress.apcRessourceCompetences.forEach(comp => {
            compet.push(comp.competence.id);
        });
        let matiere = ress.codeMatiere;
        let semestre = ress.semestre.id;
        let ac=[];
        ress.apcRessourceApprentissageCritiques.forEach(acs => {
            ac.push(acs.apprentissageCritique.id);
        });
        let libelle = ress.libelleCourt;
     
        listRessource.push({id, compet, matiere, semestre, ac, libelle});
       
    });
    ressource.addRessource(listRessource);
     
     
    let listCompetence = []
    noFilteredCompetence.forEach(comp => {
        let id = comp.id;
        let name = comp.nom_court;
        let annee = comp.apcNiveaux;
        let ac = [];
        comp.apcNiveaux.forEach(niveau => {
            niveau.apcApprentissageCritiques.forEach(acs => {
    
                ac.push(acs.id);
    
            });
        });
     
        listCompetence.push({id, name, annee, ac});
       
    });
    competence.addCompetence(listCompetence);  
     
    
    
    let listApcr = []
    noFilteredCompetence.forEach(comp => {
        comp.apcNiveaux.forEach(niveau => {
            niveau.apcApprentissageCritiques.forEach(ac => {
                
                let id = ac.id
                let idComp = comp.id;
                let idAnnee = niveau.annee.id;
                let libelle = ac.libelle;
                let libelle_short = ac.code
             
                listApcr.push({id, idComp, idAnnee, libelle, libelle_short}); 
    
            });
        });
       
    });
    apcr.addAC(listApcr); 
    
    
    ressource.ressources.forEach(ress => {
        let acList = ress.ac;
        apcr.ACs.forEach(ac => {
            if (acList.find(id => id ==ac.id)!=undefined) {
                let idsem = ress.semestre;
                ac.addSem(idsem);
                ac.addRess(ress.id);
            }
        });
    });

    sae.saes.forEach(sae => {
        let acList = sae.ac;
        apcr.ACs.forEach(ac => {
            if (acList.find(id => id ==ac.id)!=undefined) {
                ac.addSae(sae.id);
            }
        });
    })
    
    
    let Semestre = [[283,"S1"],
                    [284,"S2"],
                    [285,"S3"],
                    [286,"S4"],
                    [287,"S5"],
                    [288,"S6"]]
    
    let listSem = [];
    Semestre.forEach(sem => {
        let id = sem[0];
        let libelle = sem[1];
        listSem.push({id, libelle}); 
        
    });
    semestreManager.addSem(listSem);
    
    
    let acListForSem = [];
    semestreManager.semestres.forEach(sem => {
        apcr.ACs.forEach(ac => {
            if(ac.idSem.includes(sem.id)) {
                acListForSem.push(ac.id);
            }
        });
        sem.addAcList(acListForSem);
        acListForSem=[];
    });
}
createManager();











let iteration1 = function() {
    let listeSae = [] // [[[sae] ,[[compName, [ac, ac, ac]],[compName, [ac, ac, ac]]]], [[sae] ,[[compName, [ac, ac, ac]],[compName, [ac, ac, ac]]]]]
    let listeCouple = [] // [[compName, [ac, ac, ac]],[compName, [ac, ac, ac]]]
    let listeAC = [] // [ac, ac, ac]
    
    sae.saes.forEach(sae => {
        let saeName = [sae.matiere];
        let acIdBySae = sae.ac;
        competence.comps.forEach(comp => {
            let compName = comp.name;
            comp.ac.forEach(ac => {
                acIdBySae.forEach(acSae => {
                    if (acSae == ac) {
                        listeAC.push(ac);
                    }
                });
            });
            listeCouple.push([compName,listeAC])
            listeAC = [];
        });
        listeSae.push([saeName, listeCouple]);
        listeCouple= [];
    });
    
    // console.log(listeSae);
    
    
    anychart.onDocumentReady(function () {

        var customTheme = {
            // define settings for bar charts
            "column": {
                // settings for default x axis
                "defaultXAxisSettings": {
                    // set x axis title
                    "title": {
                        "text": "SAE",
                        "enabled": true
                    },
                    "labels": {
                        "fontSize": "10px",
                        "width": "40px",
                        "height": "40px",
                        "wordWarp": "wrap",
                        "hAlign": "middle",
                    }
                },
                // settings for default y axis
                "defaultYAxisSettings": {
                    // set axis name
                    "title": {
                        "text": "Nombre d'Apprentissages Critiques",
                        "enabled": true
                    }
                },
                "palette": {
                    "type": "distinct",
                    "items": ["#89D99D", "#3B8C6E", "#1E5959", "#0B2B40", "#164773"]
                  }
            }
        };
    
        let dataFinal = []; //[[]]
        let dataTable = [];
        let length = [];
        listeSae.forEach(sae => {
            sae[1].forEach(couple => {
                // console.log(couple);
                length.push(couple[1].length)
            });
            // console.log(length);
            dataTable= sae[0].concat(length);
            length=[];
            dataFinal.push(dataTable);
        });
        
        // console.log(dataFinal);
    
        var data = anychart.data.set(dataFinal);
        
        // map the data
        var seriesData_1 = data.mapAs({x: 0, value: 1});
        var seriesData_2 = data.mapAs({x: 0, value: 2});
        var seriesData_3 = data.mapAs({x: 0, value: 3});
        var seriesData_4 = data.mapAs({x: 0, value: 4});
        var seriesData_5 = data.mapAs({x: 0, value: 5});
        
        anychart.theme(customTheme);

        // create a chart
        var chart = anychart.column();
        
        // enable the value stacking mode
        chart.yScale().stackMode("value");
        
        // create area series, set the data
        var series1 = chart.column(seriesData_1);
        var series2 = chart.column(seriesData_2);
        var series3 = chart.column(seriesData_3);
        var series4 = chart.column(seriesData_4);
        var series5 = chart.column(seriesData_5);
        
        // configure tooltips
        series1.tooltip().format(competence.comps[0].name + `
        {%value} ({%yPercentOfCategory}{decimalsCount:2}%)`);
        series2.tooltip().format(competence.comps[1].name + `
        {%value} ({%yPercentOfCategory}{decimalsCount:2}%)`);
        series3.tooltip().format(competence.comps[2].name + `
        {%value} ({%yPercentOfCategory}{decimalsCount:2}%)`);
        series4.tooltip().format(competence.comps[3].name + `
        {%value} ({%yPercentOfCategory}{decimalsCount:2}%)`);
        series5.tooltip().format(competence.comps[4].name + `
        {%value} ({%yPercentOfCategory}{decimalsCount:2}%)`);
        
        // configure labels on the y-axis
        chart.yAxis().labels().format("{%value}");
        
        // set the chart title
        chart.title("Nombre d'AC par SAE et trié par Compétence");
        chart.background().fill("#f5f5f5");

        
        // set the container id
        chart.container("container");
        
        // initiate drawing the chart
        chart.draw();
    });

}

iteration1();




let createSelectIt2 = function() {
    let selectSem = document.getElementById("selectSem");
 
    let optionSem;
    semestreManager.semestres.forEach(sem => {
        optionSem = document.createElement("option");
        optionSem.innerHTML = sem.libelle;
        optionSem.value = sem.libelle;
        selectSem.appendChild(optionSem);
        selectSem.style.display = "none";
    });
   
    let selectSae = document.getElementById("selectSae");
   
    let optionSae;
    sae.saes.forEach(sae => {
        optionSae = document.createElement("option");
        optionSae.innerHTML = sae.matiere;
        optionSae.value = sae.id;
        selectSae.appendChild(optionSae);
        selectSae.style.display = "none";
    });
   
    let selectRes = document.getElementById("selectRes");
   
    let optionRes;
    ressource.ressources.forEach(res => {
        optionRes = document.createElement("option");
        optionRes.innerHTML = res.matiere;
        optionRes.value = res.id;
        selectRes.appendChild(optionRes);
        selectRes.style.display = "none";
    });
 
    handler_select();
}
 
let handler_select = function() {
    let selectSem = document.getElementById("selectSem");
    let selectSae = document.getElementById("selectSae");
    let selectRes = document.getElementById("selectRes");
    let selectValue = document.getElementById("selectAll").value;
    console.log(selectValue)
    if (selectValue == "selectSem"){
        selectSem.style.display = "block";
        selectSae.style.display = "none";
        selectRes.style.display = "none";
    }
    if (selectValue == "selectSae"){
        selectSem.style.display = "none";
        selectSae.style.display = "block";
        selectRes.style.display = "none";
    }
    if (selectValue == "selectRes"){
        selectSem.style.display = "none";
        selectSae.style.display = "none";
        selectRes.style.display = "block";
    }
}


let iteration2 = function(ev) {

    let container = document.getElementById("containerIt2")
    container.innerHTML=""; 

    let targetid;
    if (ev==null) {
        console.log("a");
        targetid="selectSem";   
    }
    else {
        targetid = ev.target.id;
        console.log(targetid);
    }

    let listeCouple = [] // [[compName, [ac, ac, ac]],[compName, [ac, ac, ac]]]

    let selectSemValue = document.getElementById("selectSem").value;
    let curentSem = semestreManager.getSemByLib(selectSemValue);

    let selectSaeValue = document.getElementById("selectSae").value;
    let curentSae = sae.getSaeById(selectSaeValue);

    let selectResValue = document.getElementById("selectRes").value;
    let curentRes = ressource.getRessourceById(selectResValue);

    let curentName;

    if (targetid == "selectSem") {
    

        curentName = curentSem[0].libelle;
    
        let listeAC = [] // [ac, ac, ac]
        
    
        let acIdBySem = curentSem[0].acList;
        competence.comps.forEach(comp => {
            let compName = [comp.name];
            comp.ac.forEach(ac => {
                acIdBySem.forEach(acSem => {
                    if (acSem == ac) {
                        listeAC.push(ac);
                    }
                });
            });
            listeCouple.push([compName,listeAC])
            listeAC = [];
        });
    }
    else if (targetid == "selectSae") {

        curentName = curentSae[0].matiere;

        let listeAC = [] // [ac, ac, ac]
        
    
        let acIdBySae = curentSae[0].ac;
        competence.comps.forEach(comp => {
            let compName = [comp.name];
            comp.ac.forEach(ac => {
                acIdBySae.forEach(acSae => {
                    if (acSae == ac) {
                        listeAC.push(ac);
                    }
                });
            });
            listeCouple.push([compName,listeAC])
            listeAC = [];
        });
    }
    else if (targetid == "selectRes") {

        curentName = curentRes[0].matiere;
       
        let listeAC = [] // [ac, ac, ac]
        
    
        let acIdByRes = curentRes[0].ac;
        competence.comps.forEach(comp => {
            let compName = [comp.name];
            comp.ac.forEach(ac => {
                acIdByRes.forEach(acRes => {
                    if (acRes == ac) {
                        listeAC.push(ac);
                    }
                });
            });
            listeCouple.push([compName,listeAC])
            listeAC = [];
        });
    }




    anychart.onDocumentReady(function () {
 
        console.log(curentName);

        let dataFinal = []; //[{name: "sae/sem" , children: [ { name: "comp", children: [{name: "AC.O2"},{name: "AC.O2"},{name: "AC.O2"}]}]}]
        let MainObj = {};
        let MainChildren = [];
        let CompObj = {};
        let CompChildren = [];
        let AcObj = {};
        let color =  ["#89D99D", "#3B8C6E", "#1E5959", "#0B2B40", "#164773"]
        let i = 0;
        listeCouple.forEach(couple => { 
            let left = couple[0];
            let right = couple[1];
            right.forEach(ac => {
                AcObj = {hover: apcr.getNameById(ac), name : apcr.getSNameById(ac)}
                CompChildren.push(AcObj);
            });
            CompObj = {name: left[0], normal: {fill: color[i]}, children: CompChildren};
            CompChildren = [];
            MainChildren.push(CompObj);
            i++



        });
        MainObj = {name: curentName, children: MainChildren}
        dataFinal.push(MainObj);
        console.log(dataFinal);

        
        
        
        // create a chart and set the data
        var chart = anychart.sunburst(dataFinal, "as-tree");
        
        // set the chart title
        chart.title().useHtml(true);
        chart.title(curentName);
        chart.background().fill("#f5f5f5");

        
        chart.tooltip().format("{%hover}");
        chart.tooltip().fontSize(8);

        // set the container id
        chart.container("containerIt2");
   
        // initiate drawing the chart
        chart.draw();
    });



    
}

createSelectIt2();
iteration2();  

let selectAll = document.getElementById("selectAll");
selectAll.addEventListener("change", handler_select);
let select = document.getElementById("select");
select.addEventListener("change", iteration2);



let createSelectIt3 = function() {
    
    let selectSae = document.getElementById("selectIt3");
    
    let optionSae;
    sae.saes.forEach(sae => {
        optionSae = document.createElement("option");
        optionSae.innerHTML = sae.matiere;
        optionSae.value = sae.id;
        selectSae.appendChild(optionSae);
    });

}


let iteration3 = function(ev) {

    let container = document.getElementById("containerIt3")
    container.innerHTML=""; 



    let listeCouple = [] // [[compName, [ac, ac, ac]],[compName, [ac, ac, ac]]]


    let selectSaeValue = document.getElementById("selectIt3").value;
    let curentSae = sae.getSaeById(selectSaeValue);


    let curentName;


    curentName = curentSae[0].matiere;

    let listeAC = [] // [ac, ac, ac]
    

    let acIdBySae = curentSae[0].ac;
    competence.comps.forEach(comp => {
        let compName = [comp.name];
        comp.ac.forEach(ac => {
            acIdBySae.forEach(acSae => {
                if (acSae == ac) {
                    listeAC.push(ac);
                }
            });
        });
        listeCouple.push([compName,listeAC])
        listeAC = [];
    });





    anychart.onDocumentReady(function () {
 
        console.log(curentName);

        let dataFinal = []; //[{name: "sae/sem" , children: [ { name: "comp", children: [{name: "AC.O2", children: [{res}]},{name: "AC.O2", children: [{res}]},{name: "AC.O2", children: [{res}]}]}]}]
        let MainObj = {};
        let MainChildren = [];
        let CompObj = {};
        let CompChildren = [];
        let AcObj = {};
        let AcChildren = [];
        let ResObj= {};
        let color =  ["#89D99D", "#3B8C6E", "#1E5959", "#0B2B40", "#164773"]
        let i = 0;
        listeCouple.forEach(couple => { 
            let left = couple[0];
            let right = couple[1];
            right.forEach(ac => {
                ressource.ressources.forEach(res => {
                    if (res.ac.includes(ac)) {
                        ResObj = {hover: ressource.getNameById(res.id),name: res.matiere};
                        AcChildren.push(ResObj);
                    }
                });
                AcObj = {hover: apcr.getNameById(ac), name : apcr.getSNameById(ac), children: AcChildren}
                AcChildren=[];
                CompChildren.push(AcObj);
            });
            CompObj = {name: left[0], normal: {fill: color[i]}, children: CompChildren};
            CompChildren = [];
            MainChildren.push(CompObj);
            i++



        });
        MainObj = {name: curentName, children: MainChildren}
        dataFinal.push(MainObj);
        console.log(dataFinal);

        
        
        
        // create a chart and set the data
        var chart = anychart.sunburst(dataFinal, "as-tree");
        
        // set the chart title
        chart.title().useHtml(true);
        chart.title(curentName);
        chart.background().fill("#f5f5f5");
        
        chart.tooltip().format("{%hover}");
        chart.tooltip().fontSize(8);
        // set the container id
        chart.container("containerIt3");
   
        // initiate drawing the chart
        chart.draw();
    });



    
}


createSelectIt3();
iteration3();  
let selectit3 = document.getElementById("selectIt3")
selectit3.addEventListener("change", iteration3);







let iteration4 = function() {

    let container = document.getElementById("containerIt4")
    container.innerHTML=""; 



    let listeFinal = [] // 






    anychart.onDocumentReady(function () {



        let dataFinal = {} // 
        let node = [];
        let edge = [];

        apcr.ACs.forEach(ac => {
            let acName = ac.libelle_s;
            let compName = competence.getCompById(ac.idComp);
            let idSem = ac.idSem;
            let idRes = ac.idRess;
            let idSae = ac.idSae;
            // console.log(acName, compName, idSem);
            idSem.forEach(id => {
                let semName = semestreManager.getNameById(id);
                let findnod = node.find(nod => nod.id==semName);
                if (findnod==undefined) {
                    node.push({id: semName, group: "semestre"})
                }
                let findedge = edge.find(ed => ed.from==acName && ed.to == semName);
                if (findedge==undefined) {
                    edge.push({from: acName, to: semName})
                }
                
            });
            idRes.forEach(id => {
                let resName = ressource.getNameById(id);
                let findnod = node.find(nod => nod.id==resName);
                if (findnod==undefined) {
                    node.push({id: resName, group: "ressources"})
                }
                let findedge = edge.find(ed => ed.from==acName && ed.to == resName);
                if (findedge==undefined) {
                    edge.push({from: acName, to: resName})
                }
                
            });
            idSae.forEach(id => {
                let saeName = sae.getNameById(id);
                let findnod = node.find(nod => nod.id==saeName);
                if (findnod==undefined) {
                    node.push({id: saeName, group: "SAE"})
                }
                let findedge = edge.find(ed => ed.from==acName && ed.to == saeName);
                if (findedge==undefined) {
                    edge.push({from: acName, to: saeName})
                }
                
            });
            node.push({id: acName, group: "AC"});
            let findnod = node.find(nod => nod.id==compName);
            if (findnod==undefined) {
                node.push({id: compName, group: "competences"});
            }
            let findedge = edge.find(ed => ed.from==acName && ed.to == compName);
            if (findedge==undefined) {
                edge.push({from: acName, to: compName})
            }
        });
        dataFinal = {nodes: node, edges: edge}
        console.log(dataFinal);

    // create a chart and set the data
    var chart = anychart.graph(dataFinal);
 
    // prevent the default behavior of the chart
    chart.interactivity().enabled(false);
 
    // set the chart title
    chart.title("Réseau de dépendances");
 
    // chart.edges().normal().stroke("#89D99D", 2.5);
    // chart.edges().hovered().stroke("#89D99D", 5);
    // visuel ac
    chart.group("AC").normal().fill("#89D99D");
    chart.group("AC").normal().height(20);
    chart.group("AC").hovered().fill("#89D99D");
    chart.group("AC").hovered().height(40);
    // visuel semestres
    chart.group("semestre").normal().fill("#3B8C6E");
    chart.group("semestre").normal().height(20);
    chart.group("semestre").hovered().fill("#3B8C6E");
    chart.group("semestre").hovered().height(40);
    // visuel compétences
    chart.group("competences").normal().fill("#1E5959");
    chart.group("competences").normal().height(20);
    chart.group("competences").hovered().fill("#1E5959");
    chart.group("competences").hovered().height(40);
    // visuel ressources
    chart.group("ressources").normal().fill("#0B2B40");
    chart.group("ressources").normal().height(20);
    chart.group("ressources").hovered().fill("#0B2B40");
    chart.group("ressources").hovered().height(40);
    // // visuel sae
    chart.group("SAE").normal().fill("#164773");
    chart.group("SAE").normal().height(20);
    chart.group("SAE").hovered().fill("#164773");
    chart.group("SAE").hovered().height(40);
   
    chart.background().fill("#f5f5f5");
    // set the container id
    chart.container("containerIt4");
 
    // initiate drawing the chart
    chart.draw();
    });


    
}

iteration4();



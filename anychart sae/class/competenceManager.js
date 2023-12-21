import {Competence} from './competence.js';

class CompetenceManager {
    #comps;

    constructor() {
        this.#comps = [];
    }

    get comps() {
        return this.#comps;
    }

    addCompetence(comps) {
        for(let uid in comps) {
            let comp = comps[uid];
            this.#comps.push(new Competence(comp.id, comp.name, comp.annee, comp.ac));
        }
    } 

    getById(id) {
        let result = [];
        result = result.concat(this.#comps.filter(comp => comp.id == id));
        return result;
    }

    getCompById(id) {
        let result = this.comps.filter(comp => comp.id == id)
        return result[0].name;
    }


    nodesFromId(table) {
        let result = [];
        table.forEach(comp => {
            let get = this.getById(comp);
            result.push({id: get.name});
        });
        return result;
    }




}

export {CompetenceManager};
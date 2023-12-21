import {Sae} from './sae.js';

class SaeManager {
    #saes;

    constructor() {
        this.#saes = [];
    }

    get saes() {
        return this.#saes;
    }

    addSae(saes) {
        for(let uid in saes) {
            let sae = saes[uid];
            this.#saes.push(new Sae(sae.id, sae.compet, sae.matiere, sae.semestre, sae.ac));
        }
    } 

    searchByMatiere(str) {
        return this.#saes.filter(sae => sae.matiere.toLowerCase().includes(str.toLowerCase()));
    }

    get sAC() {
        return this.#saes.map(sae => sae.ac);
    }

    getSaeById(id) {
        let result = [];
        result = result.concat(this.#saes.filter(sae => sae.id == id));
        return result;
    }
    
    getComps() {
        console.log(this.#saes.map(sae => sae.competence));
        return this.#saes.map(sae => sae.competence);
        
    }    
    getNameById(id) {
        let result = this.#saes.filter(sae => sae.id == id);
        return result[0].matiere;
    }
    
    nodesFromId(table) {
        let result = [];
        table.forEach(sae => {
            let get = this.getSaeById(sae);
            result.push({id: get.matiere});
        });
        return result;
    }

    


}

export {SaeManager};
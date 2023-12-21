import {Ressource} from './ressource.js';

class RessourceManager {
    #ressources;

    constructor() {
        this.#ressources = [];
    }

    get ressources() {
        return this.#ressources;
    }

    addRessource(ressources) {
        for(let uid in ressources) {
            let ress = ressources[uid];
            this.#ressources.push(new Ressource(ress.id, ress.compet, ress.matiere, ress.semestre, ress.ac, ress.libelle));
        }
    } 

    searchBySemestre(idsem) {
        let result = [];
        result = result.concat(this.#ressources.filter(ress => ress.semestre == idsem));
        return result;
    }

    getRessourceById(id) {
        let result = [];
        result = result.concat(this.#ressources.filter(res => res.id == id));
        return result;
    }

    getNameById(id) {
        let result = [];
        result = result.concat(this.#ressources.filter(res => res.id == id));
        return result[0].libelle;
    }

    nodesFromId(table) {
        let result = [];
        table.forEach(ress => {
            let get = this.getRessourceById(ress);
            result.push({id: get.matiere});
        });
        return result;
    }


}

export {RessourceManager};
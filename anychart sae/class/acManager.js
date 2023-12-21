import {AC} from './ac.js';

class ACManager {
    #ACs;

    constructor() {
        this.#ACs = [];
    }

    get ACs() {
        return this.#ACs;
    }

    addAC(ACs) {
        for(let uid in ACs) {
            let ac = ACs[uid];
            this.#ACs.push(new AC(ac.id, ac.idComp, ac.idAnnee, ac.libelle, ac.libelle_short));
        }
    }

    getId() {
        return this.#ACs.map(ac => ac.id);  
    }
    
    getComps() {
        return this.#ACs.map(ac => ac.idComp);  
    }

    getById(id) {
        return this.#ACs.find(ac => ac.id == id);
    }

    getByMultipleId(table) {
        let result = [];
        table.forEach(tableId => {
            result.push(this.getById(tableId));
        });
        return result;
    }

    getCompById(id) {
        let result = this.#ACs.find(ac => ac.id == id);
        return result.idComp;
    }

    getByComp(id) {
        return this.#ACs.filter(ac => ac.idComp == id);
    }

    getNameById(id) {
        let result = this.#ACs.filter(ac => ac.id == id);
        return result[0].libelle;
    }

    getSNameById(id) {
        let result = this.#ACs.filter(ac => ac.id == id);
        return result[0].libelle_s;
    }

    nodesFromId(table) {
        let result = [];
        table.forEach(ac => {
            let get = this.getById(ac);
            result.push({id: get.libelle_short});
        });
        return result;
    }




}

export {ACManager};
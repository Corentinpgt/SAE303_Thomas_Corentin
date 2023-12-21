import {Semestre} from './semestre.js';

class SemestreManager {
    #semestres;

    constructor() {
        this.#semestres = [];
    }

    get semestres() {
        return this.#semestres;
    }

    addSem(semestres) {
        for(let uid in semestres) {
            let sem = semestres[uid];
            this.#semestres.push(new Semestre(sem.id, sem.libelle));
        }
    }
    getSemByLib(lib) {
        let result = [];
        result = result.concat(this.#semestres.filter(sem => sem.libelle == lib));
        return result;
    }

    getById(id) {
        let result = [];
        result = result.concat(this.#semestres.filter(sem => sem.id == id));
        return result;
    }

    getNameById(id) {
        let result = this.#semestres.filter(sem => sem.id == id);
        return result[0].libelle;
    }

    nodesFromId(table) {
        let result = [];
        table.forEach(sem => {
            let get = this.getById(sem);
            result.push({id: get.libelle});
        });
        return result;
    }




}

export {SemestreManager};
class AC {
    #id;
    #idComp;
    #idAnnee;
    #idSem = [];
    #idRess= [];
    #idSae= [];
    #libelle;
    #libelle_short;


    constructor(id, comp, annee, lib, lib_short) {
        this.#id = id;
        this.#idComp = comp;
        this.#idAnnee = annee;
        this.#libelle = lib;
        this.#libelle_short = lib_short;

    }


    get id() {
        return this.#id;
    }

    get idComp() {
        return this.#idComp;
    }

    get idAnnee() {
        return this.#idAnnee;
    }

    get idSem() {
        return this.#idSem;
    }
    get idRess() {
        return this.#idRess;
    }
    get idSae() {
        return this.#idSae;
    }
    get libelle() {
        return this.#libelle;
    }

    get libelle_s() {
        return this.#libelle_short;
    }

    deleteSameElement(table) {
        return table.filter((element, index, arr) => {
            return arr.indexOf(element) === index;
        });
    }
    addSem(sem) {
        this.#idSem.push(sem);
        this.#idSem = this.deleteSameElement(this.#idSem);
    }
    addRess(ress) {
        this.#idRess.push(ress);
        this.#idRess = this.deleteSameElement(this.#idRess);
    }
    addSae(sae) {
        this.#idSae.push(sae);
        this.#idSae = this.deleteSameElement(this.#idSae);
    }
}

export {AC};
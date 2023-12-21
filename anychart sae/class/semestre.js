class Semestre {
    #id;
    #libelle;
    #acList;


    constructor(id, lib) {
        this.#id = id;
        this.#libelle = lib;

    }


    get id() {
        return this.#id;
    }

    get libelle() {
        return this.#libelle;
    }

    get acList() {
        return this.#acList;
    }

    addAcList(list) {
        this.#acList = list;
    }

}

export {Semestre};
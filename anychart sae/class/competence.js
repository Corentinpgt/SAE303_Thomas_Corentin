class Competence {
    #id;
    #name;
    #annee;
    #ac;

    constructor(id, name, annee, ac) {
        this.#id = id;
        this.#name = name;
        this.#annee = annee;
        this.#ac = ac;

    }


    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get annee() {
        return this.#annee;
    }

    get ac() {
        return this.#ac;
    }


}

export {Competence};
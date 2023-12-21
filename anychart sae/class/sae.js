class Sae {
    #id;
    #competence;
    #matiere;
    #semestre;
    #ac;

    constructor(id, comp, mat, sem, ac) {
        this.#id = id;
        this.#competence = comp;
        this.#matiere = mat;
        this.#semestre = sem;
        this.#ac = ac;
    }


    get id() {
        return this.#id;
    }

    get competence() {
        return this.#competence;
    }

    get matiere() {
        return this.#matiere;
    }

    get semestre() {
        return this.#semestre;
    }

    get ac() {
        
        return this.#ac;

    }
}

export {Sae};
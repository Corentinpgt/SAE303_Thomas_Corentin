class Ressource {
    #id;
    #competence;
    #matiere;
    #semestre;
    #ac;
    #libelle;


    constructor(id, comp, mat, sem, ac, libelle) {
        this.#id = id;
        this.#competence = comp;
        this.#matiere = mat;
        this.#semestre = sem;
        this.#ac = ac;
        this.#libelle = libelle;
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

    get libelle() {
        return this.#libelle;
    }


}

export {Ressource};
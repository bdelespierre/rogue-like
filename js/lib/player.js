import Inputs from '/js/lib/inputs.js';

export default class Player {
    constructor() {
        this.setInputs(new Inputs);
    }

    // ------------------------------------------------------------------------
    // Inputs

    #inputs;

    setInputs(inputs) {
        if (! (inputs instanceof Inputs)) {
            throw "not an inputs";
        }

        this.#inputs = inputs;
        return this;
    }

    getInputs() {
        return this.#inputs;
    }
}

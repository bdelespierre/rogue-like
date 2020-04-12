export default class Inputs {
    #keys = {
        ArrowUp    : false,
        ArrowRight : false,
        ArrowDown  : false,
        ArrowLeft  : false,
        Space      : false,
        Escape     : false,
        KeyP       : false,
    };

    constructor() {
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
    }

    keyDown(event) {
        if (this.#keys[event.code] === undefined) {
            return;
        }

        event.preventDefault();
        this.#keys[event.code] = true;
    }

    keyUp(event) {
        if (this.#keys[event.code] === undefined) {
            return;
        }

        event.preventDefault();
        this.#keys[event.code] = false;
    }

    isDown(key) {
        if (this.#keys[key] === undefined) {
            throw `no such key: ${key}`
        }

        return this.#keys[key] === true;
    }

    isUp(key) {
        if (this.#keys[key] === undefined) {
            throw `no such key: ${key}`
        }

        return this.#keys[key] === false;
    }
}

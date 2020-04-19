export default class Keyboard {
    #keys = {
        // Arrows
        ArrowUp      : false,
        ArrowRight   : false,
        ArrowDown    : false,
        ArrowLeft    : false,

        // Special Keys
        Enter        : false,
        Backspace    : false,
        Space        : false,
        Escape       : false,
        ControlLeft  : false,
        ControlRight : false,
        AltLeft      : false,
        AltRight     : false,
        ShiftLeft    : false,
        ShiftRight   : false,

        // Digits row
        Backquote    : false,
        Digit1       : false,
        Digit2       : false,
        Digit3       : false,
        Digit4       : false,
        Digit5       : false,
        Digit6       : false,
        Digit7       : false,
        Digit8       : false,
        Digit9       : false,
        Digit0       : false,
        Minus        : false,
        Equal        : false,

        // Alpha
        KeyA: false,  KeyI: false,  KeyQ: false,  KeyY: false,
        KeyB: false,  KeyJ: false,  KeyR: false,  KeyZ: false,
        KeyC: false,  KeyK: false,  KeyS: false,
        KeyD: false,  KeyL: false,  KeyT: false,
        KeyE: false,  KeyM: false,  KeyU: false,
        KeyF: false,  KeyN: false,  KeyV: false,
        KeyG: false,  KeyO: false,  KeyW: false,
        KeyH: false,  KeyP: false,  KeyX: false,
    };

    // ------------------------------------------------------------------------
    // States

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

    // ------------------------------------------------------------------------
    // Events

    bindListeners(el) {
        el.addEventListener("keydown", this.onKeyDown.bind(this));
        el.addEventListener("keyup", this.onKeyUp.bind(this));

        return this;
    }

    onKeyDown(event) {
        if (this.#keys[event.code] === undefined) {
            return;
        }

        event.preventDefault();
        this.#keys[event.code] = true;
    }

    onKeyUp(event) {
        if (this.#keys[event.code] === undefined) {
            return;
        }

        event.preventDefault();
        this.#keys[event.code] = false;
    }
}

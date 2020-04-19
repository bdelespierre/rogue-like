import Mouse from '/js/lib/UI/Mouse.js';
import Keyboard from '/js/lib/UI/Keyboard.js';

export default class Inputs {
    constructor(canvas) {
        this.setMouse((new Mouse(canvas)).bindListeners(canvas.getElement()))
            .setKeyboard((new Keyboard).bindListeners(document));
    }

    // ------------------------------------------------------------------------
    // mouse

    #mouse;

    setMouse(mouse) {
        if (! (mouse instanceof Mouse)) {
            throw "not a Mouse instance";
        }

        this.#mouse = mouse;
        return this;
    }

    getMouse() {
        return this.#mouse;
    }

    get mouse() {
        return this.getMouse();
    }

    // ------------------------------------------------------------------------
    // keyboard

    #keyboard;

    setKeyboard(keyboard) {
        if (! (keyboard instanceof Keyboard)) {
            throw "not a Keyboard instance";
        }

        this.#keyboard = keyboard;
        return this;
    }

    getKeyboard() {
        return this.#keyboard;
    }

    get keyboard() {
        return this.getKeyboard();
    }
}

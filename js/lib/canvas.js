import Drawable from '/js/lib/drawable.js';

export default class Canvas {
    #elem;
    #ctx;

    constructor(elem) {
        if (! (elem instanceof HTMLCanvasElement)) {
            throw new "not an HTMLCanvasElement intance";
        }

        this.#elem = elem;
        this.#ctx  = elem.getContext('2d');
    }

    getElement() {
        return this.#elem;
    }

    getContext() {
        return this.#ctx;
    }

    getWidth() {
        return this.#elem.width;
    }

    getHeight() {
        return this.#elem.height;
    }

    // ------------------------------------------------------------------------
    // Background

    #background;

    setBackground(item) {
        if (! (item instanceof Drawable)) {
            throw "not a Drawable instance";
        }

        this.#background = item;
        return this;
    }

    getBackground() {
        return this.#background;
    }

    // ------------------------------------------------------------------------
    // Items

    #items = [];

    hasItem(item) {
        return this.#items.indexOf(item) !== -1;
    }

    addItem(item) {
        if (this.hasItem(item)) {
            return;
        }

        if (! (item instanceof Drawable)) {
            throw "not a Drawable instance";
        }

        this.#items.push(item);
        return this;
    }

    removeItem(item) {
        let offset = this.#items.indexOf(item);

        if (offset !== -1) {
            this.#items.splice(offset, 1);
        }

        return this;
    }

    resetItems() {
        this.#items = [];
        return this;
    }

    // ------------------------------------------------------------------------
    // Drawing

    clear() {
        this.#ctx.clearRect(0, 0, this.getWidth(), this.getHeight());

        return this;
    }

    draw(interp) {
        if (this.#background instanceof Drawable) {
            this.#background.draw(this.#ctx, interp);
        }

        this.#items.forEach(
            item => item.draw(this.#ctx, interp)
        );

        return this;
    }
}

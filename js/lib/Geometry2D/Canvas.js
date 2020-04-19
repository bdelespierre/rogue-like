import Box from '/js/lib/Geometry2D/Box.js';
import Drawable from '/js/lib/Geometry2D/Drawable.js';
import Point from '/js/lib/Geometry2D/Point.js';

export default class Canvas {
    constructor(element) {
        this.setElement(element);
    }

    setImageSmoothing(enabled) {
        this.getContext().imageSmoothingEnabled = enabled;

        return this;
    }

    // ------------------------------------------------------------------------
    // Canvas Element

    #element;
    #context;

    setElement(element) {
        if (! (element instanceof HTMLCanvasElement)) {
            throw new "not an HTMLCanvasElement intance";
        }

        this.#element = element;
        this.#context  = element.getContext('2d');
        return this;
    }

    getElement() {
        return this.#element;
    }

    getContext() {
        return this.#context;
    }

    getWidth() {
        return this.#element.width;
    }

    getHeight() {
        return this.#element.height;
    }

    getBox() {
        return new Box([0, 0], this.getWidth(), this.getHeight());
    }

    getClickPos(event, point) {
        const rect = this.getElement().getBoundingClientRect(),
            x = event.clientX - rect.left,
            y = event.clientY - rect.top;

        // avoids creating too many Point instances
        return point != undefined ? point.setX(x).setY(y) : new Point(x, y);
    }

    // ------------------------------------------------------------------------
    // Background

    #background;

    getBackground() {
        return this.#background;
    }

    hasBackground() {
        return this.#background != undefined;
    }

    setBackground(item) {
        if (! (item instanceof Drawable)) {
            throw "not a Drawable instance";
        }

        this.#background = item;
        return this;
    }

    // ------------------------------------------------------------------------
    // Items

    #items = [];

    getItems() {
        return this.#items;
    }

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
        this.getContext().clearRect(0, 0, this.getWidth(), this.getHeight());

        return this;
    }

    draw(interp) {
        if (this.hasBackground()) {
            this.getBackground().draw(this.getContext(), interp);
        }

        this.getItems().forEach(
            item => item.draw(this.getContext(), interp)
        );

        return this;
    }
}

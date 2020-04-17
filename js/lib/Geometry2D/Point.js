import Box from '/js/lib/Geometry2D/Box.js';

export default class Point {
    constructor(x, y) {
        this.setX(x).setY(y);
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx, dy);
    }

    distanceWith(point) {
        return this.distance(this, point);
    }

    isInside(box) {
        if (box instanceof Array) {
            box = new Box([box[0], box[1]], box[2], box[3]);
        }

        if (! (box instanceof Box)) {
            throw "not a Box instance";
        }

        return this.x >= box.x && this.x <= box.x + box.width
            && this.y >= box.y && this.y <= box.y + box.height;
    }

    // ------------------------------------------------------------------------
    // X

    #x;

    setX(x) {
        this.#x = x;
        return this;
    }

    getX() {
        return this.#x;
    }

    translateX(offset, min, max) {
        this.#x += offset;

        if (min != undefined) {
            this.#x = Math.max(min, this.#x);
        }

        if (max != undefined) {
            this.#x = Math.min(max, this.#x);
        }

        return this;
    }

    get x() {
        return this.getX();
    }

    set x(x) {
        this.setX(x);
    }

    // ------------------------------------------------------------------------
    // Y

    #y;

    setY(y) {
        this.#y = y;
        return this;
    }

    getY() {
        return this.#y;
    }

    translateY(offset, min, max) {
        this.#y += offset;

        if (min != undefined) {
            this.#y = Math.max(min, this.#y);
        }

        if (max != undefined) {
            this.#y = Math.min(max, this.#y);
        }

        return this;
    }

    get y() {
        return this.getY();
    }

    set y(y) {
        this.setY(y);
    }
}

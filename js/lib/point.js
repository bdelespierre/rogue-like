export default class Point {
    constructor(x, y) {
        this.setX(x).setY(y);
    }

    static distance(a, b) {
        const dx = a.getX() - b.getX();
        const dy = a.getY() - b.getY();

        return Math.hypot(dx, dy);
    }

    distanceWith(point) {
        return this.distance(this, point);
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
}

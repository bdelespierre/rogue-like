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

    get y() {
        return this.getY();
    }

    set y(y) {
        this.setY(y);
    }
}

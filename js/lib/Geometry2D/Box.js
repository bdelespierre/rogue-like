import Point from '/js/lib/Geometry2D/Point.js';

export default class Box {
    constructor(position, width, height) {
        this.setPosition(position)
            .setWidth(width)
            .setHeight(height);
    }

    // 0----+
    // |    |
    // +----1
    //
    getVectors() {
        return [
            new Point(this.x,              this.y),
            new Point(this.x + this.width, this.y + this.height),
        ];
    }

    // 0----1
    // |    |
    // 3----2
    //
    getPoints() {
        return [
            new Point(this.x,          this.y),
            new Point(this.x + this.w, this.y),
            new Point(this.x + this.w, this.y + this.h),
            new Point(this.x,          this.y + this.h),
        ];
    }

    // x_overlaps = (a.left < b.right) && (a.right > b.left)
    // y_overlaps = (a.top < b.bottom) && (a.bottom > b.top)
    // collision = x_overlaps && y_overlaps
    //
    overlaps(box) {
        return (this.x < box.x + box.w) && (this.x + this.w > box.x)
            && (this.y < box.y + box.h) && (this.y + this.h > box.y);
    }

    // ------------------------------------------------------------------------
    // Position

    #position;

    setPosition(position) {
        if (position instanceof Array) {
            position = new Point(position[0], position[1]);
        }

        if (! (position instanceof Point)) {
            throw "not a Point instance";
        }

        this.#position = position;
        return this;
    }

    getPosition() {
        return this.#position;
    }

    get pos() {
        return this.getPosition();
    }

    get x() {
        return this.getPosition().getX();
    }

    set x(x) {
        this.getPosition().setX(x);
    }

    get y() {
        return this.getPosition().getY();
    }

    set y(y) {
        this.getPosition().setY(y);
    }

    // ------------------------------------------------------------------------
    // Width

    #width;

    setWidth(width) {
        if (width <= 0) {
            throw "wdth cannot be null or negative";
        }

        this.#width = width;
        return this;
    }

    getWidth() {
        return this.#width;
    }

    get width() {
        return this.getWidth();
    }

    get w() {
        return this.getWidth();
    }

    set width(width) {
        this.setWidth(width);
    }

    set w(width) {
        this.setWidth(width);
    }

    // ------------------------------------------------------------------------
    // Height

    #height;

    setHeight(height) {
        if (height <= 0) {
            throw "height cannot be null or negative";
        }

        this.#height = height;
        return this;
    }

    getHeight() {
        return this.#height;
    }

    get height() {
        return this.getHeight();
    }

    get h() {
        return this.getHeight();
    }

    set height(height) {
        this.setHeight(height);
    }

    set h(height) {
        this.setHeight(height);
    }
}

import Point from '/js/lib/point.js';

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

    overlaps(box) {
        const a = this.getVectors(),
              b = box.getVectors();

        let d1x = b[0].x - a[1].x,
            d1y = b[0].y - a[1].y,
            d2x = a[0].x - b[1].x,
            d2y = a[0].y - b[1].y;

        return ! (d1x > 0 || d1y > 0 || d2x > 0 || d2y > 0);
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

    set width(width) {
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

    set height(height) {
        this.setHeight(height);
    }
}

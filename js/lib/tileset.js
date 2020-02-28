import Animation from '/js/lib/animation.js';

export default class Tileset {
    constructor(name, source, tileSize, cols) {
        this.setName(name)
            .setSource(source)
            .setTileSize(tileSize)
            .setCols(cols);
    }

    load(loader) {
        let name = this.getName();

        if (loader.hasImage(name)) {
            let img = loader.getImage(name);
            this.setImage(img);
            return Promise.resolve(img);
        }

        return loader.loadImage(
            name,
            this.getSource(),
            img => this.setImage(img)
        );
    }

    drawTile(ctx, point, num) {
        if (this.isAnimated(num)) {
            return this.getAnimation(num).drawTile(ctx, point);
        }

        let img    = this.getImage(),
            size   = this.getTileSize(),
            tsCols = this.getCols();

        let x = ((num - 1) % tsCols) * size,
            y = Math.floor((num - 1) / tsCols) * size;

        if (img === null) {
            throw `tileset ${this.getName()} is not loaded`;
        }

        ctx.drawImage(
            img,                 // image
            x,                   // source x
            y,                   // source y
            size,                // source width
            size,                // source height
            point.getX(),        // target x
            point.getY(),        // target y
            size,                // target width
            size                 // target height
        );
    }

    // ------------------------------------------------------------------------
    // Image

    #image;

    setImage(image) {
        if (! (image instanceof Image)) {
            throw "not a Image instance";
        }

        this.#image = image;
        return this;
    }

    getImage() {
        return this.#image;
    }

    // ------------------------------------------------------------------------
    // Name

    #name;

    setName(name) {
        if (! name) {
            throw "invalid name";
        }

        this.#name = name;
        return this;
    }

    getName() {
        return this.#name;
    }

    // ------------------------------------------------------------------------
    // Name

    #source;

    setSource(source) {
        if (! source) {
            throw "invalid source";
        }

        this.#source = source;
        return this;
    }

    getSource() {
        return this.#source;
    }

    // ------------------------------------------------------------------------
    // Tile size

    #tileSize;

    setTileSize(tileSize) {
        if (tileSize <= 0) {
            throw "tileSize cannot be null or negative";
        }

        this.#tileSize = tileSize;
        return this;
    }

    getTileSize() {
        return this.#tileSize;
    }

    // ------------------------------------------------------------------------
    // Columns

    #cols;

    setCols(cols) {
        if (cols <= 0) {
            throw "cols cannot be null or negative";
        }

        this.#cols = cols;
        return this;
    }

    getCols() {
        return this.#cols;
    }

    // ------------------------------------------------------------------------
    // Animated tiles

    #animations = {};

    registerAnimation(tileNum, animationClass) {
        this.#animations[tileNum] = () => new animationClass;
        return this;
    }

    isAnimated(tileNum) {
        return tileNum in this.#animations;
    }

    getAnimation(tileNum) {
        if (this.#animations[tileNum] instanceof Function) {
            this.#animations[tileNum] = this.#animations[tileNum]();
        }

        return this.#animations[tileNum];
    }

    updateAnimations(delta) {
        for (let tileNum in this.#animations) {
            if (this.#animations[tileNum] instanceof Animation) {
                this.#animations[tileNum].update(delta);
            }
        }

        return this;
    }
}

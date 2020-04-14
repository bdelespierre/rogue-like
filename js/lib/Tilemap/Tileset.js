import Animation from '/js/lib/Tilemap/Animation.js';
import Box from '/js/lib/Geometry2D/Box.js';

export default class Tileset {
    debug=true;

    constructor(image, tileSize, cols) {
        this.setImage(image)
            .setTileSize(tileSize)
            .setCols(cols);
    }

    drawTile(ctx, pos, num) {
        if (this.isAnimated(num)) {
            return this.getAnimation(num).drawTile(ctx, pos);
        }

        let img    = this.getImage(),
            size   = this.getTileSize(),
            tsCols = this.getCols();

        let x = ((num - 1) % tsCols) * size,
            y = Math.floor((num - 1) / tsCols) * size;

        ctx.drawImage(
            img,   // image
            x,     // source x
            y,     // source y
            size,  // source width
            size,  // source height
            Math.round(pos.x), // target x
            Math.round(pos.y), // target y
            size,  // target width
            size   // target height
        );

        if (this.debug) {
            ctx.strokeStyle = 'blue';
            ctx.strokeRect(pos.x, pos.y, size, size);

            if(this.hasCollisionBoxes(num)) {
                ctx.fillStyle = 'rgba(255,0,0,0.3)';
                this.getCollisionBoxes(num).forEach(box => {
                    ctx.fillRect(pos.x + box.x, pos.y + box.y, box.w, box.h)
                });
            }
        }
    }

    // ------------------------------------------------------------------------
    // Image

    #image;

    setImage(image) {
        if (! (image instanceof Image)) {
            throw "not an Image instance";
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

    animate(tileNum, animation) {
        if (! (animation instanceof Animation)) {
            throw "not an Animation instance";
        }

        this.#animations[tileNum] = animation;
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

    // ------------------------------------------------------------------------
    // Collisions

    #collisionBoxes = {};

    addCollisionBox(tileNum, box) {
        if (! (box instanceof Box)) {
            throw "not a Box instance";
        }

        if (this.#collisionBoxes[tileNum] == undefined) {
            this.#collisionBoxes[tileNum] = [];
        }

        this.#collisionBoxes[tileNum].push(box);
        return this;
    }

    hasCollisionBoxes(tileNum) {
        return tileNum in this.#collisionBoxes;
    }

    getCollisionBoxes(tileNum) {
        return this.#collisionBoxes[tileNum];
    }
}

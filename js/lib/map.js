import Drawable from '/js/lib/drawable.js';

export default class Map extends Drawable {
    constructor(tilesets, cols, rows, tileSize, tiles) {
        super();

        this.setTilesets(tilesets)
            .setCols(cols)
            .setRows(rows)
            .setTileSize(tileSize)
            .setTiles(tiles);
    }

    *load(loader) {
        for (let key in this.getTilesets()) {
            yield this.getTileset(key).load(loader);
        }
    }

    draw(ctx, interp) {
        for (let c = 0; c < this.getCols(); c++) {
            for (let r = 0; r < this.getRows(); r++) {
                let num = this.getTile(c, r);

                // 0 => empty tile
                if (num === 0) {
                    continue;
                }

                this.getTileset('dungeon').drawTile(ctx, num, c, r);
            }
        }
    }

    // ------------------------------------------------------------------------
    // Tilesets

    #tilesets;

    setTilesets(tilesets) {
        this.#tilesets = tilesets;
        return this;
    }

    getTilesets() {
        return this.#tilesets;
    }

    getTileset(name) {
        if (! (name in this.#tilesets)) {
            throw "no such tileset " + name;
        }

        return this.#tilesets[name];
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
    // Rows

    #rows;

    setRows(rows) {
        if (rows <= 0) {
            throw "rows cannot be null or negative";
        }

        this.#rows = rows;
        return this;
    }

    getRows() {
        return this.#rows;
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
    //

    #tiles;

    setTiles(tiles) {
        if (! (tiles instanceof Array)) {
            throw "not an Array instance";
        }

        if (tiles.length == 0) {
            throw "tiles array is empty"
        }

        this.#tiles = tiles;
        return this;
    }

    getTiles() {
        return this.#tiles;
    }

    getTile(col, row) {
        return this.#tiles[row * this.#cols + col]
    }
}

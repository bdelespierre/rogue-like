import Drawable from '/js/lib/drawable.js';
import Tileset from '/js/lib/tileset.js';
import Point from '/js/lib/point.js';

export default class Map extends Drawable {
    constructor(cols, rows, tileSize) {
        super();

        this.setCols(cols)
            .setRows(rows)
            .setTileSize(tileSize);
    }

    update(delta) {
        this.getTilesets().forEach(
            tileset => tileset.updateAnimations(delta)
        );
    }

    draw(ctx, interp) {
        for (let c = 0; c < this.getCols(); c++) {
            for (let r = 0; r < this.getRows(); r++) {
                for (let l = 0; l < this.getLayers(); l++) {
                    let num = this.getTile(l, c, r);

                    // 0 => empty tile
                    if (num == 0) {
                        continue;
                    }

                    let tileset = this.getTilesetForTile(num);

                    let point = new Point(
                        c * tileset.getTileSize(),
                        r * tileset.getTileSize()
                    );

                    tileset.drawTile(ctx, point, this.translateTileToTilesetNum(num));
                }
            }
        }
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
    // Tilesets

    #tilesets = [];

    addTileset(firstgid, tileset) {
        if (! (tileset instanceof Tileset)) {
            throw "not a Tileset instance";
        }

        this.#tilesets.push([firstgid, tileset]);
        this.#tilesets.sort((a, b) => Math.sign(a[0] - b[0]));
        return this;
    }

    getTilesetForTile(num) {
        let tileset = null;

        for (let i = 0; i < this.#tilesets.length; i++) {
            if (num >= this.#tilesets[i][0]) {
                tileset = this.#tilesets[i][1];
            }
        }

        return tileset;
    }

    translateTileToTilesetNum(num) {
        let offset = null;

        for (let i = 0; i < this.#tilesets.length; i++) {
            if (num >= this.#tilesets[i][0]) {
                offset = this.#tilesets[i][0];
            }
        }

        return num - (offset -1);
    }

    getTilesets() {
        return this.#tilesets.map(ts => ts[1]);
    }

    // ------------------------------------------------------------------------
    // Layers

    #layers = [];

    addLayer(tiles) {
        this.#layers.push(tiles);
        return this;
    }

    getLayers() {
        return this.#layers.length;
    }

    setTile(layer, col, row, value) {
        if (this.#layers[layer] == undefined) {
            throw "no such layer " + layer;
        }

        this.#layers[layer][row * this.getCols() + col] = value;
        return this;
    }

    getTile(layer, col, row) {
        if (this.#layers[layer] == undefined) {
            throw "no such layer" + layer;
        }

        return this.#layers[layer][row * this.getCols() + col];
    }

    // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    /*
    constructor(cols, rows, tileSize) {
        super();

        this.setCols(cols)
            .setRows(rows)
            .setTileSize(tileSize)
            .setTilesets(new window.Map);
    }

    *load(loader) {
        for (let key in this.getTilesets()) {
            yield this.getTileset(key).load(loader);
        }
    }

    update(delta) {
        // update the map's tilesets so they can update their animations
        this.getLayers().forEach(
            layer => layer.getTileset().updateAnimations(delta)
        );
    }

    draw(ctx, interp) {
        for (let c = 0; c < this.getCols(); c++) {
            for (let r = 0; r < this.getRows(); r++) {
                this.getLayers().forEach(function (layer) {
                    let num = layer.getTile(c, r);

                    // 0 => empty tile
                    if (num === 0) {
                        continue;
                    }

                    let point = new Point(
                        c * tileset.getTileSize(),
                        r * tileset.getTileSize()
                    );

                    this.getTilesetForTile(num).drawTile(ctx, point, num);
                })
            }
        }
    }

    // ------------------------------------------------------------------------
    // Tilesets

    #tilesets;

    setTilesets(tilesets) {
        if (tilesets instanceof Array) {
            tilesets = new window.Map(tilesets);
        }

        if (! (tilesets instanceof window.Map)) {
            throw "not an Array instance";
        }

        this.#tilesets = tilesets;
        return this;
    }

    getTilesets() {
        return this.#tilesets;
    }

    addTileset(firstgid, tileset) {
        if (! (tileset instanceof Tileset)) {
            throw "not a Tileset instance";
        }

        this.#tileset.set(tileset, firstgid);
        return this;
    }

    getTilesetForTile(num) {
        let keys = this.#tilesets.keys;

        for (let i in keys) {
            if (num < this.#tilesets.get(keys[i])) {
                return keys[i];
            }
        }

        return null;
    }

    // ------------------------------------------------------------------------
    // Layers

    #layers = [];

    setLayers(layers) {
        if (! (layers instanceof Array)) {
            throw "not an Array instance";
        }

        // reset layers
        this.#layers = [];

        layers.forEach(layer => this.addLayer(layer));
        return this;
    }

    getLayers() {
        return this.#layers;
    }

    getLayer(layer) {
        return layer in this.#layers ? this.#layers[layer] : null;
    }

    addLayer(tileset, tiles) {
        this.#layers.push(new Layer(this, tileset, tiles));
        return this;
    }
    */
}

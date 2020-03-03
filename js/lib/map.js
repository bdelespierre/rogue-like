import Drawable from '/js/lib/drawable.js';
import Layer from '/js/lib/layer.js';

export default class Map extends Drawable {
    constructor(cols, rows, tileSize) {
        super();

        this.setCols(cols)
            .setRows(rows)
            .setTileSize(tileSize);
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
        this.getLayers().forEach(layer => layer.draw(ctx, interp));
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
}

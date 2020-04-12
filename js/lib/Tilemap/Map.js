import Box from '/js/lib/Geometry2D/Box.js';
import Drawable from '/js/lib/Geometry2D/Drawable.js';
import Point from '/js/lib/Geometry2D/Point.js';
import Tileset from '/js/lib/Tilemap/Tileset.js';

export default class Map extends Drawable {
    constructor(cols, rows, tileSize, camera) {
        super();

        this.setCols(cols)
            .setRows(rows)
            .setTileSize(tileSize)
            .setCamera(camera)
    }

    update(delta) {
        this.getTilesets().forEach(
            tileset => tileset.updateAnimations(delta)
        );
    }

    draw(ctx, interp) {
        let camera   = this.getCamera(),
            tsize    = this.getTileSize(),
            startCol = Math.floor(camera.x / tsize),
            startRow = Math.floor(camera.y / tsize),
            endCol   = startCol + (camera.width / tsize),
            endRow   = startRow + (camera.height / tsize),
            offsetX  = -camera.x + startCol * tsize,
            offsetY  = -camera.y + startRow * tsize;

        for (let c = startCol; c <= endCol; c++) {
            for (let r = startRow; r <= endRow; r++) {
                for (let l = 0; l < this.getLayers(); l++) {
                    let num = this.getTile(l, c, r);

                    // 0 => empty tile
                    if (num == 0) {
                        continue;
                    }

                    let tileset = this.getTilesetForTile(num);

                    tileset.drawTile(ctx, new Point(
                        (c - startCol) * tsize + offsetX,
                        (r - startRow) * tsize + offsetY
                    ), this.translateTileToTilesetNum(num));
                }
            }
        }
    }

    getWidth() {
        return this.getCols() * this.getTileSize();
    }

    getHeight() {
        return this.getRows() * this.getTileSize();
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

        if (col < 0 || col >= this.getCols() || row < 0 || row >= this.getRows()) {
            return 0;
        }

        return this.#layers[layer][row * this.getCols() + col] ?? 0;
    }

    // ------------------------------------------------------------------------
    // Camera

    #camera;

    setCamera(camera) {
        if (camera == undefined) {
            camera = new Box([0, 0], this.getWidth(), this.getHeight());
        }

        if (! (camera instanceof Box)) {
            throw "not a Box instance";
        }

        this.#camera = camera;
        return this;
    }

    getCamera() {
        return this.#camera;
    }
}

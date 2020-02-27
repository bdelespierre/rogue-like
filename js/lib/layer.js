import Drawable from '/js/lib/drawable.js';
import Map from '/js/lib/map.js';
import Tileset from '/js/lib/tileset.js';
import Point from '/js/lib/point.js';

export default class Layer extends Drawable {
    constructor(map, tileset, tiles) {
        super();

        this.setMap(map)
            .setTileset(tileset)
            .setTiles(tiles);
    }

    draw(ctx, interp) {
        let tileset = this.getTileset();

        for (let c = 0; c < this.getMap().getCols(); c++) {
            for (let r = 0; r < this.getMap().getRows(); r++) {
                let num = this.getTile(c, r);

                // 0 => empty tile
                if (num === 0) {
                    continue;
                }

                let point = new Point(
                    c * tileset.getTileSize(),
                    r * tileset.getTileSize()
                );

                tileset.drawTile(ctx, point, num);
            }
        }
    }

    // ------------------------------------------------------------------------
    // Map

    #map;

    setMap(map) {
        if (! (map instanceof Map)) {
            throw "not a Map instance";
        }

        this.#map = map;
        return this;
    }

    getMap() {
        return this.#map;
    }

    // ------------------------------------------------------------------------
    // Tileset

    #tileset;

    setTileset(tileset) {
        if (! (tileset instanceof Tileset)) {
            throw "not a Tileset instance";
        }

        this.#tileset = tileset;
        return this;
    }

    getTileset() {
        return this.#tileset;
    }

    // ------------------------------------------------------------------------
    // Tiles

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
        return this.#tiles[row * this.getMap().getCols() + col]
    }
}

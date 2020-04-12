import TmxParser from '/js/lib/tmx.js';
import TsxParser from '/js/lib/tsx.js';
import Map from '/js/lib/map.js';
import Tileset from '/js/lib/tileset.js';

export default class Loader {

    // ------------------------------------------------------------------------
    // maps

    #maps = {};

    async loadMap(name, src) {
        let tmx = await this.loadTmx(src),
            definition = tmx.getMapDefinition(),
            map = new Map(definition.cols, definition.rows, definition.tileSize);

        // paths (source) in .tmx & .tsx files are relative to the
        // file itself so we need to prepend a prefix to fetch the
        // images and the .tsx files.
        let path = src.substr(0, src.lastIndexOf('/'));

        await Promise.all(tmx.getTilesetsDefinition().map(async ts => {
            let firstgid = ts.firstgid;

            if (ts.type == "tsx") {
                let tsx = await this.loadTsx(`${path}/${ts.source}`);
                ts = tsx.getTilesetDefinition();
            }

            await this.loadTileset(ts.name, `${path}/${ts.image.source}`, ts.tilewidth, ts.columns);
            map.addTileset(firstgid, this.getTileset(ts.name));
        }));

        tmx.getLayersDefinition().forEach(layer => {
            map.addLayer(layer);
        });

        return this.#maps[name] = map;
    }

    getMap(name) {
        return this.hasMap(name) ? this.#maps[name] : null;
    }

    hasMap(name) {
        return name in this.#maps;
    }

    // ------------------------------------------------------------------------
    // tilesets

    #tilesets = {};

    async loadTileset(name, src, tileSize, cols) {
        let image = await this.loadImage(src);

        return this.setTileset(name, new Tileset(image, tileSize, cols));
    }

    setTileset(name, tileset) {
        if (! (tileset instanceof Tileset)) {
            throw "not a Tileset instance";
        }

        this.#tilesets[name] = tileset;
        return this;
    }

    getTileset(name) {
        return this.hasTileset(name) ? this.#tilesets[name] : null;
    }

    hasTileset(name) {
        return name in this.#tilesets;
    }

    // ------------------------------------------------------------------------
    // file loaders

    loadImage(src) {
        return fetch(src).then(response => {
            if (! response.ok) {
                throw `unable to fetch ${src}`;
            }

            return response.blob();
        }).then(blob => {
            let image = new Image();
            image.src = URL.createObjectURL(blob);

            return image;
        });
    }

    loadTmx(src) {
        return fetch(src).then(response => {
            if (! response.ok) {
                throw `unable to fetch ${src}`;
            }

            return response.text().then(xml => {
                return new TmxParser(xml);
            });
        });
    }

    loadTsx(src) {
        return fetch(src).then(response => {
            if (! response.ok) {
                throw `unable to fetch ${src}`;
            }

            return response.text().then(xml => {
                return new TsxParser(xml);
            });
        });
    }
}

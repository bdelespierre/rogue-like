import Animation from '/js/lib/Tilemap/Animation.js';
import Dispatcher from '/js/lib/Game/Dispatcher.js';
import Map from '/js/lib/Tilemap/Map.js';
import Tileset from '/js/lib/Tilemap/Tileset.js';
import TmxParser from '/js/lib/Tilemap/TmxParser.js';
import TsxParser from '/js/lib/Tilemap/TsxParser.js';

export default class Loader {
    constructor(dispatcher) {
        this.setDispatcher(dispatcher);
    }

    // ------------------------------------------------------------------------
    // dispatcher

    #dispatcher;

    setDispatcher(dispatcher) {
        if (! (dispatcher instanceof Dispatcher)) {
            throw "not a Dispatcher instance";
        }

        this.#dispatcher = dispatcher;
        return this;
    }

    getDispatcher() {
        return this.#dispatcher;
    }

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

            let tileset = await this.loadTilesetFromImage(ts.name, `${path}/${ts.image.source}`, ts.tilewidth, ts.columns);
            map.addTileset(firstgid, tileset);
        }));

        tmx.getLayersDefinition().forEach(layer => {
            map.addLayer(layer);
        });

        this.#maps[name] = map;

        this.getDispatcher().dispatch('loaded.map', {
            map: this.#maps[name],
            name: name,
        });

        return this.#maps[name];
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

    async loadTilesetFromImage(name, src, tileSize, cols) {
        if (this.#tilesets[name] != undefined) {
            console.warn(`tileset ${name} already exists`);
            return this.#tilesets[name];
        }

        let image = await this.loadImage(src);
        this.#tilesets[name] = new Tileset(image, tileSize, cols);

        this.getDispatcher().dispatch('loaded.tileset', {
            tileset: this.#tilesets[name],
            name: name,
        });

        return this.#tilesets[name];
    }

    getTileset(name) {
        return this.hasTileset(name) ? this.#tilesets[name] : null;
    }

    hasTileset(name) {
        return name in this.#tilesets;
    }

    // ------------------------------------------------------------------------
    // animations

    #animations = {};

    /**
     * @todo remove this
     */
    async loadAnimationFromJson(name, src) {
        let json = await this.loadJson(src);

        let tileset = await this.loadTilesetFromImage(
            json.tileset.name,
            json.tileset.image,
            json.tileset.tileSize,
            json.tileset.cols
        );

        if (json.repeats == "Infinity") {
            json.repeats = Infinity;
        }

        this.#animations[name] = new Animation(tileset, json.repeats, json.frames);

        this.getDispatcher().dispatch('loaded.animation', {
            animation: this.#animations[name],
            name: name,
        });

        return this.#animations[name];
    }

    getAnimation(name) {
        return this.hasAnimation(name) ? this.#animations[name] : null;
    }

    hasAnimation(name) {
        return name in this.#animations;
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

    loadJson(src) {
        return fetch(src).then(response => {
            if (! response.ok) {
                throw `unable to fetch ${src}`;
            }

            return response.json();
        })
    }
}

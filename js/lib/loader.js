import TmxParser from '/js/lib/tmx.js';
import TsxParser from '/js/lib/tsx.js';
import Map from '/js/lib/map.js';
import Tileset from '/js/lib/tileset.js';

export default class Loader {
    #images = {};

    loadImage(key, src, fn) {
        let img = new Image();

        let d = new Promise(function(resolve, reject) {
            img.onload = function() {
                this.#images[key] = img;
                resolve(img);
                if (fn !== undefined) {
                    fn(img);
                }
            }.bind(this);

            img.onerror = function() {
                reject('Could not load image: ' + src);
            };
        }.bind(this));

        img.src = src;
        return d;
    }

    getImage(key) {
        return this.hasImage(key) ? this.#images[key] : null;
    }

    hasImage(key) {
        return key in this.#images;
    }

    // ------------------------------------------------------------------------
    // maps

    async loadMap(src) {
        let tmx = await this.loadTmx(src),
            def = tmx.getMapDefinition(),
            map = new Map(def.cols, def.rows, def.tileSize);

        // paths (source) in .tmx & .tsx files are relative to the
        // file itself so we need to prepen a prefix to fetch the
        // images and the .tsx files.
        let prefix = src.substr(0, src.lastIndexOf('/'));

        let tilesetDefs = tmx.getTilesetsDefinition(),
            tilesets = [];

        for (let key in tilesetDefs) {
            let def = tilesetDefs[key];

            if (def.type == "tsx") {
                let tsx = await this.loadTsx(`${prefix}/${def.source}`);
                def = tsx.getTilesetDefinition();
            }

            tilesets.push(new Tileset(
                def.name,
                `${prefix}/${def.image.source}`,
                def.tilewidth,
                def.columns
            ));
        }

        let layerDefs = tmx.getLayersDefinition(),
            layers = [];
    }


    // ------------------------------------------------------------------------
    // Tile .tmx & .tsx

    loadTmx(src) {
        return fetch(src).then(function(response) {
            if (! response.ok) {
                throw `unable to fetch ${src}`;
            }

            return response.text().then(function (xml) {
                return new TmxParser(xml);
            });
        });
    }

    loadTsx(src) {
        return fetch(src).then(function (response) {
            if (! response.ok) {
                throw `unable to fetch ${src}`;
            }

            return response.text().then(function (xml) {
                return new TsxParser(xml);
            });
        });
    }
}

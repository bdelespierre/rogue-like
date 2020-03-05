import Map from '/js/lib/map.js';

export default class TmxParser extends DOMParser {
    constructor(xml) {
        super();
        this.setDoc(this.parseFromString(xml, "application/xml"));
    }

    // ------------------------------------------------------------------------
    // DOM Document

    #doc;

    setDoc(doc) {
        if (! (doc instanceof Document)) {
            throw "not a Document instance";
        }

        this.#doc = doc;
        return this;
    }

    getDoc() {
        return this.#doc;
    }

    // ------------------------------------------------------------------------
    // Map & Tilesets

    getMap() {
        let root       = this.getDoc().querySelector('map'),
            width      = root.getAttribute('width'),
            height     = root.getAttribute('height'),
            tilewidth  = root.getAttribute('tilewidth'),
            tileheight = root.getAttribute('tileheight');

        if (root.getAttribute('orientation') != 'orthogonal') {
            throw "cannot use non-orthogonal maps";
        }

        if (root.getAttribute('renderorder') != 'right-down') {
            throw "can only use right-down maps";
        }

        if (tilewidth != tileheight) {
            throw "can only use isometric maps";
        }

        return new Map(width, height, tilewidth);
    }

    getTilesets() {
        let tilesets = this.getDoc().getElementsByTagName('tileset');

        for (let i = 0; i < tilesets.length; i++) {
            let tileset = tilesets.item(i),
                image = tileset.querySelector('image');

            console.log(image);
        }
    }
}

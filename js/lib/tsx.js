import Tileset from '/js/lib/tileset.js';

export default class TsxParser extends DOMParser {
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
    // Get tileset

    getTilesetDefinition() {
        let root  = this.getDoc().querySelector('tileset'),
            image = root.querySelector('image');

        return {
            type:       "image",
            name:       root.getAttribute('name'),
            tilewidth:  root.getAttribute('tilewidth'),
            tileheight: root.getAttribute('tileheight'),
            tilecount:  root.getAttribute('tilecount'),
            columns:    root.getAttribute('columns'),
            image: {
                source: image.getAttribute('source'),
                width:  image.getAttribute('width'),
                height: image.getAttribute('height'),
            }
        };
    }
}

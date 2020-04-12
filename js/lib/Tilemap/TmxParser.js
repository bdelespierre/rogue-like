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
    // Definitions

    getMapDefinition() {
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

        return {
            cols: width,
            rows: height,
            tileSize: tilewidth,
        };
    }

    getTilesetsDefinition() {
        let nodes = this.getDoc().getElementsByTagName('tileset'),
            tilesets = [];

        for (let i = 0; i < nodes.length; i++) {
            let node = nodes.item(i);

            if (node.hasAttribute('source')) {
                tilesets.push({
                    type:     "tsx",
                    firstgid: node.getAttribute('firstgid'),
                    source:   node.getAttribute('source'),
                });
            } else {
                let image = node.querySelector('image');

                tilesets.push({
                    type:       "image",
                    firstgid:   node.getAttribute('firstgid'),
                    name:       node.getAttribute('name'),
                    tilewidth:  node.getAttribute('tilewidth'),
                    tileheight: node.getAttribute('tileheight'),
                    tilecount:  node.getAttribute('tilecount'),
                    columns:    node.getAttribute('columns'),
                    image: {
                        source: image.getAttribute('source'),
                        width:  image.getAttribute('width'),
                        height: image.getAttribute('height'),
                    }
                });
            }
        }

        return tilesets;
    }

    getLayersDefinition() {
        let nodes = this.getDoc().getElementsByTagName('layer'),
            layers = [];

        for (let i = 0; i < nodes.length; i++) {
            let node = nodes.item(i),
                data = node.querySelector('data');

            if (data.getAttribute('encoding') != 'csv') {
                throw "unable to parse encodings other than CSV";
            }

            layers.push(data.textContent.split(',').map(num => parseInt(num)));
        }

        return layers;
    }
}

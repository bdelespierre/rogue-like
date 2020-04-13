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
            tilewidth:  parseInt(root.getAttribute('tilewidth')),
            tileheight: parseInt(root.getAttribute('tileheight')),
            tilecount:  parseInt(root.getAttribute('tilecount')),
            columns:    parseInt(root.getAttribute('columns')),
            image: {
                source: image.getAttribute('source'),
                width:  parseInt(image.getAttribute('width')),
                height: parseInt(image.getAttribute('height')),
            },
            tiles: this.getTiles(root),
        };
    }

    getTiles(root) {
        let tiles = [],
            nodes = root.getElementsByTagName('tile');

        for (let i = 0; i < nodes.length; i++) {
            let node = nodes.item(i),
                tile = { id: parseInt(node.getAttribute('id')) };

            this.getAnimation(node, tile);
            tiles.push(tile);
        }

        return tiles;
    }

    getAnimation(root, tile) {
        let animation = root.querySelector('animation');

        if (! animation) {
            return;
        }

        let frames = animation.getElementsByTagName('frame');
        tile.animation = [];

        for (let i = 0; i < frames.length; i++) {
            let frame = frames.item(i);

            tile.animation.push({
                tileid: parseInt(frame.getAttribute('tileid')),
                duration: frame.getAttribute('duration'),
            });
        }
    }
}

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
            this.getObjectGroup(node, tile);
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

    getObjectGroup(root, tile) {
        let objectgroup = root.querySelector('objectgroup');

        if (! objectgroup) {
            return;
        }

        let objects = objectgroup.getElementsByTagName('object');
        tile.objectgroup = {
            draworder: objectgroup.getAttribute('draworder'),
            objects: [],
        };

        for (let i = 0; i < objects.length; i++) {
            let object = objects.item(i);

            tile.objectgroup.objects.push({
                id:     parseInt(object.getAttribute('id')),
                x:      parseInt(object.getAttribute('x')),
                y:      parseInt(object.getAttribute('y')),
                width:  parseInt(object.getAttribute('width')),
                height: parseInt(object.getAttribute('height')),
            });
        }
    }
}

import Tileset from '/js/lib/tileset.js';

export default class CharactersTileset extends Tileset {
    constructor() {
        super('char', '/assets/char.png', 16, 10);
    }
}

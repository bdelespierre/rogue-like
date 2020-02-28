import Tileset from '/js/lib/tileset.js';

export default class DungeonTileset extends Tileset {
    constructor() {
        super('dungeon', '/assets/dungeon.png', 16, 10);
    }
}

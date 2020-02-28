import Tileset from '/js/lib/tileset.js';
import CoinAnimation from '/js/app/animations/coin.js';

export default class DungeonTileset extends Tileset {
    constructor() {
        super('dungeon', '/assets/dungeon.png', 16, 10);

        this.registerAnimation(87, CoinAnimation)
    }
}

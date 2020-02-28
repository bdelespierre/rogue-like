import Tileset from '/js/lib/tileset.js';
import Coin from '/js/app/animations/coin.js';

export default class SkullTileset extends Tileset {
    constructor() {
        super('skull', '/assets/skull.png', 16, 10);
    }
}

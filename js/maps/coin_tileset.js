import Tileset from '/js/lib/tileset.js';

export default class Coin extends Tileset {
    constructor() {
        super('coin', '/assets/coin.png', 16, 10);
    }
}

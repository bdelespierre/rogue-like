import Animation from '/js/lib/animation.js';
import Tilesets from '/js/app/tilesets.js';

export default class CoinAnimation extends Animation {
    constructor() {
        super(Tilesets.coin, Infinity, [
            { num: 1, delay: 200 },
            { num: 2, delay: 200 },
            { num: 3, delay: 200 },
            { num: 4, delay: 600 },
        ]);
    }
}

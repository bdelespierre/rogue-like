import Animation from '/js/lib/animation.js';
import tilesets from '/js/app/tilesets.js';

export default class CoinAnimation extends Animation {
    constructor() {
        super(tilesets.coin, Infinity, [
            { num: 1, delay: 200 },
            { num: 2, delay: 200 },
            { num: 3, delay: 200 },
            { num: 4, delay: 400 },
        ]);
    }
}

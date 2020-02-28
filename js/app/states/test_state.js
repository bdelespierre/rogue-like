import State from '/js/lib/state.js';
import TestMap from '/js/app/maps/test_map.js';
import Coin from '/js/app/animations/coin.js';
import Point from '/js/lib/point.js';

export default class TestState extends State {
    map;

    constructor(game) {
        super(game);

        this.map = new TestMap();

        game.getCanvas().addItem(this.map);
    }

    update(delta) {
        this.map.update(delta);
    }

    draw(interp) {
        this.getGame().getCanvas().clear().draw(interp);
    }
}

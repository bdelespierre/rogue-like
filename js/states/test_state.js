import State from '/js/lib/state.js';
import TestMap from '/js/maps/test_map.js';

export default class TestState extends State {
    map;

    constructor(game) {
        super(game);

        this.map = new TestMap(game.getLoader());

        game.getCanvas().addItem(this.map);
    }

    draw(interp) {
        this.getGame().getCanvas().clear().draw(interp);
    }
}

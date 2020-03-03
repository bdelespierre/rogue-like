import State from '/js/lib/state.js';
import TestMap from '/js/app/maps/test_map.js';
import Coin from '/js/app/animations/coin.js';
import Point from '/js/lib/point.js';
import Utils from '/js/lib/utils.js';
import Tilesets from '/js/app/tilesets.js';

export default class TestState extends State {
    map;

    constructor(game) {
        super(game);

        this.map = new TestMap();

        game.getCanvas().addItem(this.map);

        let addCoin =() => {
            let x = Utils.randInt(0, this.map.getCols()),
                y = Utils.randInt(0, this.map.getRows());

            this.map.getLayer(1).setTile(x, y, Tilesets.dungeon.coin);
            this.getGame().after(500, addCoin);
        };

        addCoin();
    }

    update(delta) {
        this.map.update(delta);

    }

    draw(interp) {
        this.getGame().getCanvas().clear().draw(interp);
    }
}

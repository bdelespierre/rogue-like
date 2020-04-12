import Game from '/js/lib/game.js';
import Animation from '/js/lib/animation.js';
import State from '/js/lib/state.js';

Game.create('#game').load(loader => [
    loader.loadMap('dungeon', 'assets/dungeon.tmx'),
    loader.loadTileset('skull', 'assets/skull.png', 16, 4),
    loader.loadTileset('coin', 'assets/coin.png', 16, 4),
]).then(game => {
    game.getLoader().getTileset('char').animate(
        23,
        new Animation(game.getLoader().getTileset('skull'), Infinity, [
            { num: 1, delay: 200 },
            { num: 2, delay: 200 },
            { num: 3, delay: 200 },
            { num: 4, delay: 200 },
        ])
    );

    game.getLoader().getTileset('dungeon').animate(
        87,
        new Animation(game.getLoader().getTileset('coin'), Infinity, [
            { num: 1, delay: 200 },
            { num: 2, delay: 200 },
            { num: 3, delay: 200 },
            { num: 4, delay: 600 },
        ])
    );

    game.setState(new (class extends State {
        constructor(game) {
            super(game);
            this.map = game.getLoader().getMap('dungeon');
            game.getCanvas().addItem(this.map);
        }
        update(delta) {
            super.update(delta);
            this.map.update(delta);
        }
        draw(interp) {
            this.getGame().getCanvas().clear().draw(interp);
        }
    })(game)).run();
});

document.getElementById('pause').addEventListener('click', function() {
    MainLoop.stop();
});

document.getElementById('resume').addEventListener('click', function() {
    MainLoop.start();
});

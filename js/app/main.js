import Animation from '/js/lib/Tilemap/Animation.js';
import Box from "/js/lib/Geometry2D/Box.js";
import Game from '/js/lib/Game/Game.js';
import State from '/js/lib/Game/State.js';

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

            let canvas = game.getCanvas();

            this.map = game.getLoader().getMap('dungeon');
            canvas.addItem(this.map);

            this.camera = new Box(
                [32, 32],
                canvas.getWidth(),
                canvas.getHeight()
            );
            this.map.setCamera(this.camera);

            let ctx = canvas.getContext();
            ctx.scale(3, 3);
            ctx.imageSmoothingEnabled = false;
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

import Animation from '/js/lib/Tilemap/Animation.js';
import Box from "/js/lib/Geometry2D/Box.js";
import Game from '/js/lib/Game/Game.js';
import Point from '/js/lib/Geometry2D/Point.js';
import State from '/js/lib/Game/State.js';
import DummyTileset from '/js/lib/Tilemap/DummyTileset.js';

Game.create('#game').load(loader => [
    loader.loadMap('dungeon', 'assets/dungeon.tmx'),
]).then(game => {
    game.setState(new (class extends State {
        constructor(game) {
            super(game);

            let canvas = game.getCanvas();

            this.map = game.getLoader().getMap('dungeon');
            canvas.addItem(this.map);

            this.camera = new Box(
                [0, 0],
                canvas.getWidth(),
                canvas.getHeight()
            );
            this.map.setCamera(this.camera);

            let ctx = canvas.getContext();
            ctx.scale(3, 3);
            ctx.imageSmoothingEnabled = false;

            this.map.addLayer('debug', []);
            this.map.addTileset(1000, new DummyTileset(16))
            game.getCanvas().getElement().addEventListener('mousemove', event => {
                var rect = game.getCanvas().getElement().getBoundingClientRect(),
                    x = event.clientX - rect.left,
                    y = event.clientY - rect.top;

                // careful with the zoom (3x3)!
                // careful with the camera!
                let col = Math.floor(((x / 3) + this.camera.x) / this.map.getTileSize()),
                    row = Math.floor(((y / 3) + this.camera.y) / this.map.getTileSize());

                this.map.emptyLayer('debug').setTile('debug', col, row, 1001);
            });
        }
        begin(timestamp, delta) {
            let inputs = this.getGame().getPlayer().getInputs(),
                scrollSpeed = 2.5;

            if (inputs.isDown('ArrowUp')) {
                this.camera.getPosition().translateY(-scrollSpeed);
            }

            if (inputs.isDown('ArrowDown')) {
                this.camera.getPosition().translateY(scrollSpeed);
            }

            if (inputs.isDown('ArrowLeft')) {
                this.camera.getPosition().translateX(-scrollSpeed);
            }

            if (inputs.isDown('ArrowRight')) {
                this.camera.getPosition().translateX(scrollSpeed);
            }
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

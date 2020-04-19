import Animation from '/js/lib/Tilemap/Animation.js';
import Box from '/js/lib/Geometry2D/Box.js';
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
            canvas.setImageSmoothing(false);
            this.camera = canvas.getBox();
            this.map.setCamera(this.camera);
            this.map.addLayer('debug', []).addTileset(1000, new DummyTileset(16));
        }

        begin(timestamp, delta) {
            let inputs = this.getGame().getInputs(),
                scrollSpeed = 2.5,
                minX = 0, maxX = Math.max(0, (this.map.getWidth())  - this.camera.width),
                minY = 0, maxY = Math.max(0, (this.map.getHeight()) - this.camera.height);

            if (inputs.keyboard.isDown('ArrowUp')) {
                this.camera.getPosition().translateY(-scrollSpeed, minY, maxY);
            }

            if (inputs.keyboard.isDown('ArrowDown')) {
                this.camera.getPosition().translateY(scrollSpeed, minY, maxY);
            }

            if (inputs.keyboard.isDown('ArrowLeft')) {
                this.camera.getPosition().translateX(-scrollSpeed, minX, maxX);
            }

            if (inputs.keyboard.isDown('ArrowRight')) {
                this.camera.getPosition().translateX(scrollSpeed, minX, maxX);
            }

            if (inputs.mouse.wheelUp()) {
                this.map.setScale(Math.min(4, this.map.getScale() + 1));
            }

            if (inputs.mouse.wheelDown()) {
                this.map.setScale(Math.max(1, this.map.getScale() - 1));
            }

            inputs.mouse.resetWheel();

            this.map.emptyLayer('debug');
            const coords = this.map.getTileCoordinates(this.map.translateCameraPosition(inputs.mouse.position));

            if (coords != false) {
                const [col, row] = coords;
                this.map.setTile('debug', col, row, 1001);
            }
        }

        update(delta) {
            super.update(delta);
            this.map.update(delta);
        }

        draw(interp) {
            this.getGame().getCanvas().clear().draw(interp);

            let ctx = this.getGame().getCanvas().getContext();

            ctx.fillStyle = "red";
            ctx.fillRect(100, 100, 10, 10);
        }
    })(game)).run();
});

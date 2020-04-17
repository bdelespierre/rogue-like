import Animation from '/js/lib/Tilemap/Animation.js';
import Box from '/js/lib/Geometry2D/Box.js';
import Camera from '/js/lib/Game/Camera.js';
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

            this.camera = new Camera(game.getCanvas());
            this.map.setCamera(this.camera);

            canvas.setImageSmoothing(false);

            this.map.addLayer('debug', []).addTileset(1000, new DummyTileset(16))
            canvas.getElement().addEventListener('mousemove', event => {
                this.map.emptyLayer('debug');

                const pos  = this.map.translateCameraPosition(canvas.getClickPos(event)),
                    coords = this.map.getTileCoordinates(pos);

                if (coords != false) {
                    const [col, row] = coords;
                    this.map.setTile('debug', col, row, 1001);
                }
            });

            canvas.getElement().addEventListener('wheel', event => {
                event.preventDefault();

                event.deltaY < 0
                    ? this.camera.zoomIn(-0.01 * event.deltaY + 1)
                    : this.camera.zoomOut(0.01 * event.deltaY + 1);
            });
        }
        begin(timestamp, delta) {
            let inputs = this.getGame().getPlayer().getInputs(),
                scrollSpeed = 2.5,
                minX = 0, maxX = (this.map.getWidth()) - this.camera.width / this.camera.getZoomFactor(),
                minY = 0, maxY = (this.map.getHeight()) - this.camera.height / this.camera.getZoomFactor();

            if (inputs.isDown('ArrowUp')) {
                this.camera.getPosition().translateY(-scrollSpeed, minY, maxY);
            }

            if (inputs.isDown('ArrowDown')) {
                this.camera.getPosition().translateY(scrollSpeed, minY, maxY);
            }

            if (inputs.isDown('ArrowLeft')) {
                this.camera.getPosition().translateX(-scrollSpeed, minX, maxX);
            }

            if (inputs.isDown('ArrowRight')) {
                this.camera.getPosition().translateX(scrollSpeed, minX, maxX);
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

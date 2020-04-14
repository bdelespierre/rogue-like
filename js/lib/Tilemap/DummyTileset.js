import Tileset from '/js/lib/Tilemap/Tileset.js';

export default class DummyTileset extends Tileset {
    styles={
        1: "rgba(255,0,0,0.3)",
        2: "rgba(0,255,0,0.3)",
        3: "rgba(0,0,255,0.3)",
    }

    constructor(tileSize) {
        super(new Image, tileSize, 1);
    }

    drawTile(ctx, pos, num) {
        let size = this.getTileSize();

        ctx.fillStyle = this.styles[num] ?? 'rgba(255,255,255,0.1)';
        ctx.fillRect(Math.round(pos.x), Math.round(pos.y), size, size);
    }
}

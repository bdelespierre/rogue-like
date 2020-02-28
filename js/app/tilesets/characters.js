import Tileset from '/js/lib/tileset.js';
import SkullAnimation from '/js/app/animations/skull.js';

export default class CharactersTileset extends Tileset {
    constructor() {
        super('char', '/assets/char.png', 16, 7);

        this.registerAnimation(23, SkullAnimation);
    }
}

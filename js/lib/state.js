import Game from '/js/lib/game.js';

export default class State {
    constructor(game) {
        this.setGame(game);
    }

    // ------------------------------------------------------------------------
    // Game

    #game;

    setGame(game) {
        if (! (game instanceof Game)) {
            throw "not a Game instance";
        }

        this.#game = game;
        return this;
    }

    getGame() {
        return this.#game;
    }

    // ------------------------------------------------------------------------
    // Mainloop callbacks

    begin(timestamp, delta) {
        // noop
    }

    update(delta) {
        // noop
    }

    draw(interp) {
        // noop
    }

    end(fps, panic) {
        // noop
    }
}

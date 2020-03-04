import Game from '/js/lib/game.js';
import Countdown from '/js/lib/countdown.js';

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
        this.updateCountdowns(delta);
    }

    draw(interp) {
        // noop
    }

    end(fps, panic) {
        // noop
    }

    // ------------------------------------------------------------------------
    // Countdowns

    #countdowns = [];

    updateCountdowns(delta) {
        this.#countdowns.forEach(countdown => countdown.update(delta));
        this.#countdowns = this.#countdowns.filter(countdown => ! countdown.isOver());
        return this;
    }

    after(delay, fn, reps) {
        let countdown = new Countdown(delay, fn, reps);
        this.#countdowns.push(countdown);
        return countdown;
    }

    interval(delay, fn) {
        return this.after(delay, fn, Infinity);
    }
}

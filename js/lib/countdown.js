export default class Countdown {
    constructor(delay, fn) {
        this.setDelay(delay)
            .setCallback(fn);
    }

    update(delta) {
        this.decDelay(delta);
    }

    // ------------------------------------------------------------------------
    // Delay

    #delay;

    setDelay(delay) {
        if (delay <= 0) {
            throw "delay cannot be null or netgative";
        }

        this.#delay = delay;
        return this;
    }

    getDelay() {
        return this.#delay;
    }

    decDelay(amount) {
        this.#delay = Math.max(0, this.#delay - amount);

        if (this.#delay == 0) {
            this.getCallback()();
        }

        return this;
    }

    isOver() {
        return this.#delay <= 0;
    }

    // ------------------------------------------------------------------------
    // Callback

    #callback;

    setCallback(callback) {
        if (! (callback instanceof Function)) {
            throw "not a function instance";
        }

        this.#callback = callback;
        return this;
    }

    getCallback() {
        return this.#callback;
    }
}

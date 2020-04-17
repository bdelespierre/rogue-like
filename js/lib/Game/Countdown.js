export default class Countdown {
    constructor(delay, fn, reps) {
        this.setDelay(delay)
            .setOriginalDelay(delay)
            .setCallback(fn)
            .setReps(reps ?? 1);
    }

    update(delta) {
        if (this.getDelay() <= delta && this.getReps() > 0) {
            this.decReps();
            delta -= this.getDelay();
            this.resetDelay();
            this.getCallback()();
            return this.update(delta);
        }

        this.setDelay(Math.max(0, this.getDelay() - delta));
    }

    // ------------------------------------------------------------------------
    // Delay

    #delay;
    #originalDelay;

    setDelay(delay) {
        if (delay <= 0) {
            throw "delay cannot be null or netgative";
        }

        this.#delay = delay;
        return this;
    }

    setOriginalDelay(delay) {
        if (delay <= 0) {
            throw "delay cannot be null or netgative";
        }

        this.#originalDelay = delay;
        return this;
    }

    getDelay() {
        return this.#delay;
    }

    resetDelay() {
        this.#delay = this.#originalDelay;
        return this;
    }

    isOver() {
        return this.#delay <= 0 && this.getReps() <= 0;
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

    // ------------------------------------------------------------------------
    // Reps

    #reps;

    setReps(reps) {
        if (reps <= 0) {
            throw "reps cannot be null or negative";
        }

        this.#reps = reps;
        return this;
    }

    getReps() {
        return this.#reps;
    }

    decReps() {
        this.#reps--;
        return this;
    }
}

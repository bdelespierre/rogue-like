import Tileset from '/js/lib/Tilemap/Tileset.js';

export default class Animation {
    constructor(tileset, reps, frames) {
        this.setTileset(tileset)
            .setFrames(frames)
            .setReps(reps);
    }

    update(delta) {
        if (this.isFinished()) {
            return;
        }

        let timeLeft = this.getCurrentFrameTimeLeft();

        if (delta >= timeLeft) {
            this.incCurrentFrame();
            this.update(delta - timeLeft);
            return;
        }

        if (timeLeft > delta) {
            this.incCurrentFrameTime(delta);
            return;
        }
    }

    drawTile(ctx, pos) {
        this.getTileset().drawTile(ctx, pos, this.getCurrentFrame().num);
    }

    // ------------------------------------------------------------------------
    // Current frame

    #currentFrame = 0;
    #currentFrameTime = 0;

    getCurrentFrame() {
        return this.getFrame(this.#currentFrame);
    }

    getCurrentFrameTimeLeft() {
        return this.getCurrentFrame().delay - this.#currentFrameTime;
    }

    incCurrentFrame() {
        if (this.#currentFrame == this.getFrames().length -1) {
            this.decReps();

            if (! this.isFinished()) {
                this.#currentFrame = 0;
                this.#currentFrameTime = 0;
            }

            return this;
        }

        this.#currentFrame++;
        this.#currentFrameTime = 0;
        return this;
    }

    incCurrentFrameTime(delta) {
        this.#currentFrameTime += delta;
        return this;
    }

    // ------------------------------------------------------------------------
    // Repetitions

    #reps;

    setReps(reps) {
        if (reps <= 0) {
            throw "reps can't be negative";
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

    isFinished() {
        return this.#reps <= 0;
    }

    // ------------------------------------------------------------------------
    // Tileset

    #tileset;

    setTileset(tileset) {
        if (! (tileset instanceof Tileset)) {
            throw "not an Tileset instance";
        }

        this.#tileset = tileset;
        return this;
    }

    getTileset() {
        return this.#tileset;
    }

    // ------------------------------------------------------------------------
    // Frames

    #frames = [];

    setFrames(frames) {
        if (! (frames instanceof Array)) {
            throw "not an Array instance";
        }

        if (! frames.length) {
            throw "empty frames";
        }

        if (! frames.every(frame => this.isFrameValid(frame))) {
            throw "invalid frames";
        }

        this.#frames = frames;
        return this;
    }

    getFrames() {
        return this.#frames;
    }

    getFrame(num) {
        if (num < 0 || num >= this.getFrames().length) {
            throw "no such frame " + num;
        }

        return this.#frames[num];
    }

    getAnimationLength() {
        return this.getFrames().reduce((carry, frame) => carry + frame.delay);
    }

    isFrameValid(frame) {
        return frame.num   !== undefined && frame.num   >= 0
            && frame.delay !== undefined && frame.delay >= 0;
    }
}

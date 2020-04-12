import Canvas from '/js/lib/canvas.js';
import Config from '/js/lib/config.js';
import Loader from '/js/lib/loader.js';
import Player from '/js/lib/player.js';
import State from '/js/lib/state.js';

export default class Game {
    constructor(canvas, config) {
        this.setLoader(new Loader())
            .setPlayer(new Player())
            .setConfig(new Config(config))
            .setCanvas(new Canvas(canvas));

        // dummy state
        this.setState(new State(this));
    }

    static create(canvas, config) {
        if (typeof canvas == 'string') {
            canvas = window.document.querySelector(canvas);
        }

        return new this(canvas, config);
    }

    async load(callback) {
        await Promise.all(callback.call(this, this.getLoader()));

        return this;
    }

    run() {
        // useful for debugging
        window.addEventListener('error', event => MainLoop.stop());

        // setup the mainloop
        MainLoop.setBegin(this.begin.bind(this))
            .setUpdate(this.update.bind(this))
            .setDraw(this.draw.bind(this))
            .setEnd(this.end.bind(this))
            .start();

        return this;
    }

    // ------------------------------------------------------------------------
    // Mainloop callbacks

    begin(timestamp, delta) {
        this.getState().begin(timestamp, delta);
    }

    update(delta) {
        this.getState().update(delta);
    }

    draw(interp) {
        this.getState().draw(interp);
    }

    end(fps, panic) {
        this.getState().end(fps, panic);
    }

    // ------------------------------------------------------------------------
    // Loader

    #loader;

    setLoader(loader) {
        if (! (loader instanceof Loader)) {
            throw "not a Loader instance";
        }

        this.#loader = loader;
        return this;
    }

    getLoader() {
        return this.#loader;
    }

    // ------------------------------------------------------------------------
    // State

    #state;

    setState(state) {
        if (! (state instanceof State)) {
            throw "not a State instance";
        }

        this.#state = state;
        return this;
    }

    getState() {
        return this.#state;
    }

    // ------------------------------------------------------------------------
    // Player

    #player;

    setPlayer(player) {
        if (! (player instanceof Player)) {
            throw "not a Player instance";
        }

        this.#player = player;
        return this;
    }

    getPlayer() {
        return this.#player;
    }

    // ------------------------------------------------------------------------
    // Config

    #config;

    setConfig(config) {
        if (! (config instanceof Config)) {
            throw "not a Config instance";
        }

        this.#config = config;
        return this;
    }

    getConfig() {
        return this.#config;
    }

    // ------------------------------------------------------------------------
    // Canvas

    #canvas;

    setCanvas(canvas) {
        if (! (canvas instanceof Canvas)) {
            throw "not a Canvas instance";
        }

        this.#canvas = canvas;
        return this;
    }

    getCanvas() {
        return this.#canvas;
    }

    // ------------------------------------------------------------------------
    // Camera

    #camera;

    setCamera(camera) {
        if (! (camera instanceof Camera)) {
            throw "not a Camera instance";
        }

        this.#camera = camera;
        return this;
    }

    getCamera() {
        return this.#camera;
    }
}

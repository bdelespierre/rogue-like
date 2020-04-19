import Canvas from '/js/lib/Geometry2D/Canvas.js';
import Config from '/js/lib/Game/Config.js';
import Dispatcher from '/js/lib/Game/Dispatcher.js';
import Inputs from '/js/lib/UI/Inputs.js';
import Loader from '/js/lib/Game/Loader.js';
import State from '/js/lib/Game/State.js';

export default class Game {
    constructor(canvas, config) {
        this.setDispatcher(new Dispatcher())
            .setLoader(new Loader(this.getDispatcher()))
            .setConfig(new Config(config))
            .setCanvas(new Canvas(canvas))
            .setInputs(new Inputs(this.getCanvas()))

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

        this.getDispatcher().dispatch('loaded');

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
    // Dispatcher

    #dispatcher;

    setDispatcher(dispatcher) {
        if (! (dispatcher instanceof Dispatcher)) {
            throw "not a Dispatcher instance";
        }

        this.#dispatcher = dispatcher;
        return this;
    }

    getDispatcher() {
        return this.#dispatcher;
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
    // Inputs

    #inputs;

    setInputs(inputs) {
        if (! (inputs instanceof Inputs)) {
            throw "not an Inputs instance";
        }

        this.#inputs = inputs;
        return this;
    }

    getInputs() {
        return this.#inputs;
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

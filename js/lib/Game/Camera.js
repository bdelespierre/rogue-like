import Box from '/js/lib/Geometry2D/Box.js';
import Canvas from '/js/lib/Geometry2D/Canvas.js';

export default class Camera extends Box {
    constructor(canvas) {
        super([0, 0], canvas.getWidth(), canvas.getHeight());

        this.setCanvas(canvas)
    }

    // ------------------------------------------------------------------------
    // zoom

    #zoomFactor = 1;

    zoomIn(factor) {
        if (factor < 1) {
            throw "factor cannot be smaller than 1";
        }

        this.#zoomFactor *= factor;
        this.getCanvas().getContext().scale(factor, factor);
        return this;
    }

    zoomOut(factor) {
        if (factor < 1) {
            throw "factor cannot be smaller than 1";
        }

        this.#zoomFactor /= factor;
        this.getCanvas().getContext().scale(1 / factor, 1 / factor);
        return this;
    }

    getZoomFactor() {
        return this.#zoomFactor;
    }

    // ------------------------------------------------------------------------
    // canvas

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
}

import Canvas from '/js/lib/Geometry2D/Canvas.js';
import Point from '/js/lib/Geometry2D/Point.js';

export default class Mouse {
    #clicked  = false;
    #buttons  = { Left: false, Middle: false, Right: false };
    #wheel    = { x: 0, y: 0, z: 0 };
    #position;
    #locked;

    constructor(canvas) {
        this.setCanvas(canvas);
        this.#position = new Point(0, 0);
    }

    getButtonLabel(button) {
        switch (button) {
            case 0: case 'l': case 'Left':   return "Left";
            case 1: case 'm': case 'Middle': return "Middle";
            case 2: case 'r': case 'Right':  return "Right";
            default: throw `no such button: ${button}`;
        }
    }

    // ------------------------------------------------------------------------
    // States

    clicked() {
        return this.#clicked;
    }

    getPosition() {
        return this.#position;
    }

    get position() {
        return this.getPosition();
    }

    isDown(button) {
        return this.#buttons[this.getButtonLabel(button)] === true;
    }

    isUp(button) {
        return this.#buttons[this.getButtonLabel(button)] === false;
    }

    wheelUp() {
        return this.#wheel.y < 0 ? -this.#wheel.y : false;
    }

    wheelDown() {
        return this.#wheel.y > 0 ? this.#wheel.y : false;
    }

    // ------------------------------------------------------------------------
    // Events

    bindListeners(el) {
        el.addEventListener('mousemove', this.onMouseMove.bind(this));
        el.addEventListener('mousedown', this.onMouseDown.bind(this));
        el.addEventListener('mouseup', this.onMouseUp.bind(this));
        el.addEventListener('wheel', this.onWheel.bind(this));

        return this;
    }

    onMouseMove(event) {
        this.getCanvas().getClickPos(event, this.#position);
        this.#clicked = event.button == 1 && this.isDown('Left');
    }

    onMouseDown(event) {
        this.onMouseMove(event);

        this.#buttons[this.getButtonLabel(event.button)] = true;
    }

    onMouseUp(event) {
        this.onMouseMove(event);

        this.#buttons[this.getButtonLabel(event.button)] = false;
    }

    onWheel(event) {
        event.preventDefault();

        this.#wheel.x += event.deltaX;
        this.#wheel.y += event.deltaY;
        this.#wheel.z += event.deltaZ;
    }

    resetWheel() {
        this.#wheel.x = 0;
        this.#wheel.y = 0;
        this.#wheel.z = 0;
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

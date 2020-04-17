import Map from '/js/lib/Tilemap/Map.js';

export default class World {
    constructor(map, actors) {
        this.setMap(map)
            .setActors(actors ?? {});
    }

    // ------------------------------------------------------------------------
    // map

    #map;

    setMap(map) {
        if (! (map instanceof Map)) {
            throw "not a Map instance";
        }

        this.#map = map;
        return this;
    }

    getMap() {
        return this.#map;
    }

    // ------------------------------------------------------------------------
    // actors

    #actors;

    addActor(name, actor) {
        if (! (actor instanceof Actor)) {
            throw "not an Actor instance";
        }

        this.#actors[name] = actor;
        return this;
    }

    removeActor(name) {
        if (this.hasActor(name)) {
            delete this.#actors[name];
        }

        return this;
    }

    setActors(actors) {
        for (let key in actors) {
            if (! (actors[key] instanceof Actor)) {
                throw "not an Actor instance";
            }
        }

        this.#actors = actors;
        return this;
    }

    getActors() {
        return this.#actors;
    }

    hasActor(name) {
        return name in this.#actors;
    }
}

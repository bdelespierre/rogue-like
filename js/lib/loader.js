export default class Loader {
    #images = {};

    loadImage(key, src, fn) {
        let img = new Image();

        let d = new Promise(function(resolve, reject) {
            img.onload = function() {
                this.#images[key] = img;
                resolve(img);
                if (fn !== undefined) {
                    fn(img);
                }
            }.bind(this);

            img.onerror = function() {
                reject('Could not load image: ' + src);
            };
        }.bind(this));

        img.src = src;
        return d;
    }

    getImage(key) {
        return this.hasImage(key) ? this.#images[key] : null;
    }

    hasImage(key) {
        return key in this.#images;
    }
}

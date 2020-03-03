export default {
    tap: function(object, fn) {
        fn(object);
        return object;
    },

    randFloat: function(min, max) {
        return Math.random() * (max - min) + min;
    },

    randInt: function(min, max) {
        return Math.round(this.randFloat(min, max));
    },
};

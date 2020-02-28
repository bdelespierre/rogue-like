export default class Config extends Map {
    static fromObject(object) {
        let flat   = flatten(object),
            config = new this;

        for (let i in flat) {
            config.set(i, flat[i]);
        }

        return config;
    }
}

// @see https://gist.github.com/penguinboy/762197#gistcomment-2083577
function flatten(object, separator = '.') {
    return Object.assign({}, ...function _flatten(child, path = []) {
        return [].concat(...Object.keys(child).map(key => typeof child[key] === 'object'
            ? _flatten(child[key], path.concat([key]))
            : ({ [path.concat([key]).join(separator)] : child[key] })
        ));
    }(object));
}

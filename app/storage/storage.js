class Storage {
    constructor() {
        this.storage = {};
    }

    getStorage(name) {
        if (!name) {
            return this.storage;
        }

        if (!this.storage[name]) {
            this.storage[name] = {};
        }

        return this.storage[name];
    }
}

var storage = new Storage();
module.exports = storage;
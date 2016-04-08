const storage = require('./storage');

class SimpleEntityProvider {
    constructor(concreteMapper) {
        this.uniqueId = -1;
        this.mapper = concreteMapper;
        this.storage = storage;
    }

    createEntity(entity) {
        var id = ++this.uniqueId;
        this.storage.getStorage(this.mapper.className)[id] = this.mapper.constructor.mapEntity(id, entity);
        return true;
    }

    readEntity(id) {
        return this.storage.getStorage(this.mapper.className)[id];
    }

    updateEntity(id, entity) {
        this.storage.getStorage(this.mapper.className)[id] = this.mapper.constructor.mapEntity(id, entity);
        return true;
    }


    deleteEntity(id) {
        delete this.storage.getStorage(this.mapper.className)[id];
        //success; todo add support for failure
        return true;
    }

    readAll() {
        var self = this;
        return Object.keys(this.storage.getStorage(this.mapper.className))
            .map(id => this.storage.getStorage(self.mapper.className)[id], this);
    }

    deleteAll() {
        delete this.storage.getStorage()[this.mapper.className];
        return true;
    }
}

module.exports = SimpleEntityProvider;
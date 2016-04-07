class CrudService {
    constructor(provider) {
        this.provider = provider;
    }

    readAll() {
        return this.provider.readAll();
    }

    deleteAll() {
        return this.provider.deleteAll();
    }

    createEntity(entity) {
        return this.provider.createEntity(entity);
    }

    readEntity(id) {
        return this.provider.readEntity(id);
    }

    updateEntity(id, entity) {
        return this.provider.updateEntity(id, entity);
    }

    deleteEntity(id) {
        return this.provider.deleteEntity(id);
    }


}

module.exports = CrudService;
const mongoose = require('mongoose');
const Motorcycle = require('../storage/mongodb/model/motorcycle');

class MotorcycleService {
    static readAll() {
        return Motorcycle.find({}).exec();
    }

    static deleteAll() {
        return Motorcycle.remove({}).exec();
    }

    static createEntity(entity) {
        return Motorcycle.create({
            type: entity.type,
            name: entity.name,
            description: entity.description
        });
    }

    static readEntity(id) {
        return Motorcycle.findById(id).exec();
    }

    static updateEntity(id, entity) {

        return Motorcycle.findByIdAndUpdate(id, {
            $set: {
                type: entity.type,
                name: entity.name,
                description: entity.description
            }
        }, {upsert: true, "new": true}).exec();
    }

    static deleteEntity(id) {
        return Motorcycle.findByIdAndRemove(id).exec();
    }
}

module.exports = MotorcycleService;
'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Alert extends Model {

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    static boot() {
        super.boot()
        this.addHook('beforeCreate', 'AlertHook.setTimestamp');
    }
}

module.exports = Alert

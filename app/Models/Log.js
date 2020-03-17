'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Log extends Model {

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    static boot() {
        super.boot()
        this.addHook('beforeCreate', 'LogHook.setTimestamp');
        this.addHook('beforeCreate', 'LogHook.print');
    }
}

module.exports = Log

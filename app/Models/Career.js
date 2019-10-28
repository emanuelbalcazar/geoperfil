'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Career extends Model {
    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    campuses() {
        return this.belongsToMany('App/Models/Campus').pivotTable('campus_careers')
    }
}

module.exports = Career

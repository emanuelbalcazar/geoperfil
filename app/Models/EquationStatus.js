'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EquationStatus extends Model {

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    equation() {
        return this.hasOne('App/Models/Equation');
    }

    site() {
        return this.hasOne('App/Models/Site');
    }
}

module.exports = EquationStatus

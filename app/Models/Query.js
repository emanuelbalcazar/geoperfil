'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/**
 *
 * TODO change to Query model
 * @class Equation
 * @extends {Model}
 */
class Query extends Model {

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    equations() {
        return this.hasMany('App/Models/EquationStatus');
    }
}

module.exports = Query;

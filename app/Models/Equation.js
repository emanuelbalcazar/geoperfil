'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Equation extends Model {

    static get createdAtColumn () {
        return null;
    }

    static get updatedAtColumn () {
        return null;
    }

    selectors () {
        return this.hasMany('App/Models/Selector')
    }
}

module.exports = Equation

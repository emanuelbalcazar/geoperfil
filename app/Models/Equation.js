'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Equation extends Model {

    selectors () {
        return this.hasMany('App/Models/Selector')
    }
}

module.exports = Equation

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Campus extends Model {

    static get createdAtColumn () {
        return null;
    }

    static get updatedAtColumn () {
        return null;
    }

    /* career() {
        return this.hasMany('App/Models/Career')
    } */

}

module.exports = Campus

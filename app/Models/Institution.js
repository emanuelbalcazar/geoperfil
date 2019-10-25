'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Institution extends Model {

    static get createdAtColumn () {
        return null;
    }

    static get updatedAtColumn () {
        return null;
    }

    campus() {
        return this.hasMany('App/Models/Campus')
    }

}

module.exports = Institution

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Professional extends Model {

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    career() {
        return this.hasOne('App/Models/Career');
    }

    campus() {
        return this.hasOne('App/Models/Campus');
    }
}

module.exports = Professional

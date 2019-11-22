'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EquationArticle extends Model {

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    equation() {
        return this.hasOne('App/Models/Equation');
    }

    article() {
        return this.hasOne('App/Models/Article');
    }
}

module.exports = EquationArticle

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Article extends Model {

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    articles() {
        return this.belongsToMany('App/Models/Equation').pivotTable('equation_articles')
    }
}

module.exports = Article

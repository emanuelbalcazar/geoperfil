'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquationArticleSchema extends Schema {
    up() {
        this.create('equation_articles', (table) => {
            table.increments()
            table.integer('equation_id').references('id').inTable('equations')
            table.integer('article_id').references('id').inTable('articles')
        })
    }

    down() {
        this.drop('equation_articles')
    }
}

module.exports = EquationArticleSchema

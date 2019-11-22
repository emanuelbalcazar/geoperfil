'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleAddColumnSchema extends Schema {
    up() {
        this.alter('articles', (table) => {
            table.dropColumn('datepublished');
            table.dropColumn('datemodified');
            table.boolean('is_processed').defaultTo(false);
            table.boolean('is_useful');
        })
    }

    down() {
        this.table('articles', (table) => {
            table.dropColumn('is_processed');
            table.dropColumn('is_useful');
        })
    }
}

module.exports = ArticleAddColumnSchema

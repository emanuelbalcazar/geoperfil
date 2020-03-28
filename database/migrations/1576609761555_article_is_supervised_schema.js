'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleIsSupervisedSchema extends Schema {
    up() {
        this.table('articles', (table) => {
            // alter table
            table.boolean('is_supervised').defaultTo(false);
        });
    }

    down() {
        this.table('articles', (table) => {
            // reverse alternations
            table.dropColumn('is_supervised');
        });
    }
}

module.exports = ArticleIsSupervisedSchema

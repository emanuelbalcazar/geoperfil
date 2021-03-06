'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database');

class ArticleSchema extends Schema {
    up() {
        this.create('articles', (table) => {
            table.increments();
            table.string('title', 300);
            table.string('link', 800).unique();
            table.string('displayLink', 800);
            table.string('snippet', 800);
            table.text('html');
            table.text('text', 'longtext');
            table.datetime('datepublished');
            table.datetime('datemodified');
        })
    }

    down() {
        this.drop('articles')
    }
}

module.exports = ArticleSchema




'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LogSchema extends Schema {
    up() {
        this.create('logs', (table) => {
            table.increments()
            table.string('level', 100);
            table.string('module', 250)
            table.text('message', 'longtext');
            table.datetime('timestamp');
        })
    }

    down() {
        this.drop('logs');
    }
}

module.exports = LogSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlertSchema extends Schema {
    up() {
        this.create('alerts', (table) => {
            table.increments();
            table.string('name', 250);
            table.string('type', 100).notNullable();
            table.integer('priority').defaultTo(3); // 1: high, 2: medium, 3: low
            table.string('description', 500);
            table.boolean('resolved').defaultTo(false);
            table.string('data', 500);
            table.datetime('timestamp');
        });
    }

    down() {
        this.drop('alerts');
    }
}

module.exports = AlertSchema

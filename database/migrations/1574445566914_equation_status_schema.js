'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquationStatusSchema extends Schema {
    up() {
        this.create('equation_statuses', (table) => {
            table.increments();
            table.integer('equation_id').references('id').inTable('equations');
            table.integer('site_id').references('id').inTable('sites');
            table.integer('start').defaultTo(1);
            table.integer('lastExecution').defaultTo(0);
            table.boolean('active').defaultTo(true);
        });
    }

    down() {
        this.drop('equation_statuses')
    }
}

module.exports = EquationStatusSchema

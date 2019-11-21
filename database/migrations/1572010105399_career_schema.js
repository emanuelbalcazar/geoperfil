'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CareerSchema extends Schema {
    up() {
        this.create('careers', (table) => {
            table.increments()
            table.string('name', 250).notNullable().unique()
            table.string('duration', 25)
        })
    }

    down() {
        this.drop('careers')
    }
}

module.exports = CareerSchema

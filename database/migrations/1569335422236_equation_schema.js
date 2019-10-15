'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EquationSchema extends Schema {
    up() {
        this.create('equations', (table) => {
            table.increments()
            table.string('q', 100).notNullable()
            table.string('siteSearch', 200).notNullable()
            table.string('siteSearchFilter', 200).notNullable().defaultTo('i')
            table.integer('limit').defaultTo( 1 )
            table.boolean('active').defaultTo( true )
        })
    }

    down() {
        this.drop('equations')
    }
}

module.exports = EquationSchema

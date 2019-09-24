'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SelectorSchema extends Schema {
  up () {
    this.create('selectors', (table) => {
      table.increments()
        table.string('selector', 100).notNullable()
        table.integer('equation_id').references('id').inTable('equations')

    })
  }

  down () {
    this.drop('selectors')
  }
}

module.exports = SelectorSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CareerSchema extends Schema {
  up () {
    this.table('careers', (table) => {
      table.increments()
      table.string('name', 250)
      table.string('duration', 25)    })
  }

  down () {
    this.table('careers', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CareerSchema

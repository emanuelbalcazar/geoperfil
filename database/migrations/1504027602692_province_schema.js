'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProvinceSchema extends Schema {
  up() {
    this.create('provinces', (table) => {
      table.increments()
      table.string('full_name', 300)
      table.string('name', 200)
      table.decimal('centroid_lat', 10, 8)
      table.decimal('centroid_lon', 10, 8)
    })
  }

  down() {
    this.drop('provinces');
  }
}

module.exports = ProvinceSchema

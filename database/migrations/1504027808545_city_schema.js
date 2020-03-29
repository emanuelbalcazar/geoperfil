'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CitySchema extends Schema {
  up () {
    this.create('cities', (table) => {
      table.increments()
      table.string('name',300)
      table.string('postal_code', 10)
      table.decimal('centroid_lat', 10,8 )
      table.decimal('centroid_lon', 10,8 )
      table.integer('province_id').references('id').inTable('provinces')
    })
  }

  down () {
    this.drop('cities')
  }
}

module.exports = CitySchema

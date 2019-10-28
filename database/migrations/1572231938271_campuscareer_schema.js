'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CampuscareerSchema extends Schema {
  up () {
    this.create('campuscareers', (table) => {
      table.increments()
      table.integer('campus_id').references('id').inTable('campuses')
      table.integer('career_id').references('id').inTable('careers')
    })
  }

  down () {
    this.drop('campuscareers')
  }
}

module.exports = CampuscareerSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfessionalSchema extends Schema {
  up () {
    this.create('professionals', (table) => {
      table.increments();
      table.string('name');
      table.string('surname');
      table.string('career_name');
      table.string('campus_name');
      table.integer('career_id').references('id').inTable('careers');
      table.integer('campus_id').references('id').inTable('campuses');
    })
  }

  down () {
    this.drop('professionals')
  }
}

module.exports = ProfessionalSchema

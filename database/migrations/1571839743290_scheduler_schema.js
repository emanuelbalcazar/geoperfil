'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SchedulerSchema extends Schema {
  up () {
    this.create('schedulers', (table) => {
      table.increments()
      table.string('schedule')
      table.integer('requestCount')
    })
  }

  down () {
    this.drop('schedulers')
  }
}

module.exports = SchedulerSchema

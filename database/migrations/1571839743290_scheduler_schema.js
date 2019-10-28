'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SchedulerSchema extends Schema {
    up() {
        this.create('schedulers', (table) => {
            table.increments()
            table.string('name').notNullable().unique()
            table.string('currentSchedule').defaultTo('*/10 * * * * *')
            table.integer('requestCount').defaultTo(0)
            table.string('nextMonth').defaultTo('*/10 * * * * *')
            table.string('nextDay').defaultTo('*/5 * * * * *')
            table.boolean('dailyExecution').defaultTo(false);
        })
    }

    down() {
        this.drop('schedulers')
    }
}

module.exports = SchedulerSchema

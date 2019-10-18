'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CampusSchema extends Schema {
    up() {
        this.create('campuses', (table) => {
            table.increments()
            table.string('name', 250)
            table.string('address', 250)
            table.enu('modality', ['classroom', 'virtual'])
            table.decimal('latitude')
            table.decimal('longitude')
            table.integer('institution_id').references('id').inTable('institutions')
        });
    }

    down() {
        this.drop('campuses')
    }
}

module.exports = CampusSchema

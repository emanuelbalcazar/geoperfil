'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CampusSchema extends Schema {
    up() {
        this.create('campuses', (table) => {
            table.increments()
            table.string('name', 250)
            table.string('address', 250)
            //table.string('city',100 )
            table.enu('modality', ['classroom', 'virtual'])
            table.decimal('latitude', 10,8)
            table.decimal('longitude', 10,8)
            table.integer('institution_id').references('id').inTable('institutions')
            table.integer('city_id').references('id').inTable('cities')
        });
    }

    down() {
        this.drop('campuses')
    }
}

module.exports = CampusSchema

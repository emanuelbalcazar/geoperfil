'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Campus extends Model {

    static get createdAtColumn () {
        return null;
    }

    static get updatedAtColumn () {
        return null;
    }

    static boot() {

        super.boot()

        /**
         * A hook to hash the user password before saving
         * it to the database.
         */
        this.addHook('beforeSave', async (userInstance) => {

        })
    }

}

module.exports = Campus

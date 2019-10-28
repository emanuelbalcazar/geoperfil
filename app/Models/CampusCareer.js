'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CampusCareer extends Model {
    
    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }
   
   
    static boot () {
        super.boot()
        this.addHook('beforeCreate', (campusCareer) => {
            campusCareer.dictates = true
        })
      }
}

module.exports = CampusCareer

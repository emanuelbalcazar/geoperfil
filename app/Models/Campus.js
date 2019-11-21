'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const axios = require('axios')
const uri = "https://nominatim.openstreetmap.org/search?format=jsonv2";

class Campus extends Model {

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    static boot() {

        super.boot()

        /**
         * A hook
         */
        this.addHook('beforeSave', async (campusInstance) => {
            let URL = uri + '&street="' + campusInstance.address + '"&city="' + campusInstance.city + '"';
            const response = await axios.get(URL);
            const data = response.data;

            if (data[0]) {
                campusInstance.latitude = data[0].lat;
                campusInstance.longitude = data[0].lon;
            }
        });
    }

    /*Relation campus-careers*/
    careers() {
        return this.belongsToMany('App/Models/Career').pivotTable('campus_careers')
    }

}

module.exports = Campus

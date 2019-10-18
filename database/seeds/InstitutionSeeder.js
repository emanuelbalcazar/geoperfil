'use strict'

/*
|--------------------------------------------------------------------------
| InstitutionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Config = use('Config')
const Institution = use('App/Models/Institution')
const Logger = use('Logger')
const Csv = require('csvtojson')

const FILEPATH = __dirname + '/files/institutions.csv';

class InstitutionSeeder {
    async run() {

        let institutions = await Csv().fromFile(FILEPATH);

        for (const institution of institutions) {
            let record = await Institution.create(institution);
        }

        Logger.info('[Seeder] - Carga de Instituciones a la base de datos completada.');
    }
}

module.exports = InstitutionSeeder

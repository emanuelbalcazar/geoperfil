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
        let count = 0;

        for (const institution of institutions) {
            let exists = await Institution.query().where(institution).getCount();

            if (exists == 0) {
                await Institution.create(institution);
                count++;
            }
        }

        Logger.info(`[Seeder] - Se cargaron ${count} instituciones`);
    }
}

module.exports = InstitutionSeeder

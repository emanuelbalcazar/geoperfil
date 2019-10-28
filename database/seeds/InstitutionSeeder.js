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
const Institution = use('App/Models/Institution');
const csv = require('csvtojson');
const Logger = use('Logger');
const Helper = use('App/Helper/Utils')

const INSTITUTIONS_FILES = __dirname + '/files/institutions/';
const CAMPUS_FILES = __dirname + '/files/campus/';

class InstitutionSeeder {

    async run() {
        if (Helper.isDirectory(INSTITUTIONS_FILES)) {
            let institutionsFiles = Helper.getDirectories(INSTITUTIONS_FILES);

            for (const file of institutionsFiles) {
                let institution = await csv().fromFile(INSTITUTIONS_FILES + file);
                let campus = await csv().fromFile(CAMPUS_FILES + file);
                let count = await Institution.query().where(institution[0]).getCount();

                if (count == 0) {
                    let instance = await Institution.create(institution[0]);
                    await instance.campus().createMany(campus);
                }
            }

            Logger.info('[Seeder] - Se cargaron las instituciones correctamente');
        }
    }
}

module.exports = InstitutionSeeder

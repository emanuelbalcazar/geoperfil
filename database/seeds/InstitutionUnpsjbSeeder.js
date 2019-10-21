'use strict'

/*
|--------------------------------------------------------------------------
| InstitutionUnpsjbSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Institution = use('App/Models/Institution')
const Campus = use('App/Models/Campus')
const Logger = use('Logger')
const csv = require('csvtojson')

const INSTITUTION_FILE = __dirname + '/files/unpsjb/unpsjb.csv';
const CAMPUS_FILE = __dirname + '/files/unpsjb/unpsjb-campus.csv';

class InstitutionUnpsjbSeeder {

    async run() {
        let institution = await csv().fromFile(INSTITUTION_FILE);
        let allCampus = await csv().fromFile(CAMPUS_FILE);

        let unpsjb = await Institution.create(institution[0]);
        await unpsjb.campus().createMany(allCampus);
    }
}

module.exports = InstitutionUnpsjbSeeder

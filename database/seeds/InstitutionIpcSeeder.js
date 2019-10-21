'use strict'

/*
|--------------------------------------------------------------------------
| InstitutionIssmSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Institution = use('App/Models/Institution')
const csv = require('csvtojson')

const INSTITUTION_FILE = __dirname + '/files/ipcs/ipcs.csv';
const CAMPUS_FILE = __dirname + '/files/ipcs/ipcs-campus.csv';

class InstitutionIpcSeeder {
    async run() {
        let institution = await csv().fromFile(INSTITUTION_FILE);
        let allCampus = await csv().fromFile(CAMPUS_FILE);

        let instance = await Institution.create(institution[0]);
        await instance.campus().createMany(allCampus);
    }
}


module.exports = InstitutionIpcSeeder

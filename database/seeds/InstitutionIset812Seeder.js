'use strict'

/*
|--------------------------------------------------------------------------
| InstitutionIset812Seeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Institution = use('App/Models/Institution')
const csv = require('csvtojson')

const INSTITUTION_FILE = __dirname + '/files/iset812/iset812.csv';
const CAMPUS_FILE = __dirname + '/files/iset812/iset812-campus.csv';

class InstitutionIset812Seeder {
    async run() {
        let institution = await csv().fromFile(INSTITUTION_FILE);
        let allCampus = await csv().fromFile(CAMPUS_FILE);

        let instance = await Institution.create(institution[0]);
        await instance.campus().createMany(allCampus);
    }
}

module.exports = InstitutionIset812Seeder

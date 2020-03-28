'use strict'

/*
|--------------------------------------------------------------------------
| ProvinceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
//const Factory = use('Factory')

const csv = require('csvtojson');
const Province = use('App/Models/Province');
const Logger = use('Logger');

const PROVS_FILE = __dirname + '/files/provinces/provinces.csv';

class ProvinceSeeder {
    async run() {
        let provinces = await csv().fromFile(PROVS_FILE);

        for (const prov of provinces) {
            let lat = Number.parseFloat(prov.centroid_lat);
            let lon = Number.parseFloat(prov.centroid_lon);
            await Province.findOrCreate({ name: prov.name }, { name: prov.name, full_name: prov.full_name, centroid_lat: lat, centroid_lon: lon });
        }

        Logger.info('Se cargaron las provincias correctamente', 'Seeder');
    }
}

module.exports = ProvinceSeeder

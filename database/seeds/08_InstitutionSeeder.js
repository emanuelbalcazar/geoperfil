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
const City = use('App/Models/City');

const axios = require('axios')
const uri = "https://nominatim.openstreetmap.org/search?format=jsonv2";

const INSTITUTIONS_FILES = __dirname + '/files/institutions/';
const CAMPUS_FILES = __dirname + '/files/campus/';

class InstitutionSeeder {

    async run() {
        if (Helper.isDirectory(INSTITUTIONS_FILES)) {
            let institutionsFiles = Helper.getDirectories(INSTITUTIONS_FILES);

            for (const file of institutionsFiles) {
                // obtengo la institucion y sus sedes, los identifica por el mismo nombre de archivo
                let institution = await csv().fromFile(INSTITUTIONS_FILES + file);
                let campus = await csv().fromFile(CAMPUS_FILES + file);

                let count = await Institution.query().where(institution[0]).getCount();

                if (count == 0) {
                    // creo la institucion
                    let instance = await Institution.create(institution[0]);

                    let arrayCampus = [];

                    for (let camp of campus) {
                        let city = await City.query().where({ name: String(camp.city).toUpperCase() }).first();

                        // get lat and lon
                        let URL = uri + '&street="' + camp.address + '"&city="' + camp.city + '"';
                        const response = await axios.get(URL);
                        const data = response.data;

                        if (data[0]) {
                            camp.latitude = data[0].lat;
                            camp.longitude = data[0].lon;
                        }

                        arrayCampus.push({
                            name: camp.name,
                            address: camp.address,
                            modality: camp.modality,
                            latitude: camp.latitude,
                            longitude: camp.longitude,
                            city_id: city.id
                        });
                    }
                    // creo las sedes de esa institucion
                    await instance.campuses().createMany(arrayCampus);
                }
            }

            Logger.info('Se cargaron las instituciones y sus sedes correctamente', 'Seeder');
        }
    }
}

module.exports = InstitutionSeeder

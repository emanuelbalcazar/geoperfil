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
                        let city = City.query().where({ name: camp.city });

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
                    await instance.campus().createMany(arrayCampus);
                }
            }

            Logger.info('Se cargaron las instituciones y sus sedes correctamente', 'Seeder');
        }
    }
}

module.exports = InstitutionSeeder

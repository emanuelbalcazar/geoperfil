'use strict'

/*
|--------------------------------------------------------------------------
| EquationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Query = use('App/Models/Query');
const csv = require('csvtojson');
const Logger = use('Logger');

const QUERY_FILES = __dirname + '/files/queries/queries.csv';

class EquationSeeder {
    async run() {
        let queries = await csv().fromFile(QUERY_FILES);

        for (const query of queries) {
            await Query.findOrCreate(query, query);
        }

        Logger.info('Se cargaron las consultas de busqueda correctamente', 'Seeder');
    }
}

module.exports = EquationSeeder

'use strict'

/*
|--------------------------------------------------------------------------
| EquationStatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const EquationStatus = use('App/Models/EquationStatus');
const Site = use('App/Models/Site');
const Equation = use('App/Models/Equation');

const csv = require('csvtojson');
const Logger = use('Logger');
const Helper = use('App/Helper/Utils');

const EQUATION_STATUS_FILE = __dirname + '/files/equation_status/equation_status.csv';

class EquationStatusSeeder {
    async run() {
        let equationStatus = await csv().fromFile(EQUATION_STATUS_FILE);

        for (const status of equationStatus) {
            let equation = await Equation.query().where({ q: status.equation }).first();
            let site = await Site.query().where({ site: status.site }).first();

            await EquationStatus.findOrCreate({ equation_id: equation.id, site_id: site.id }, { equation_id: equation.id, site_id: site.id, start: status.start, lastExecution: status.lastExecution, active: status.active });
        }

        Logger.info('Se cargaron los estados de las ecuaciones correctamente', 'Seeder');
    }
}

module.exports = EquationStatusSeeder

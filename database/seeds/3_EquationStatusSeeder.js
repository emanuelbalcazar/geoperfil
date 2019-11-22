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
const csv = require('csvtojson');
const Logger = use('Logger');
const Helper = use('App/Helper/Utils');

const EQUATION_STATUS = __dirname + '/files/equation_status/';

class EquationStatusSeeder {
    async run() {
        if (Helper.isDirectory(EQUATION_STATUS)) {
            let equationStatusFiles = Helper.getDirectories(EQUATION_STATUS);

            for (const file of equationStatusFiles) {
                let status = await csv().fromFile(EQUATION_STATUS + file);
                let count = await EquationStatus.query().where(status[0]).getCount();

                if (count == 0) {
                    let instance = await EquationStatus.createMany(status);
                }
            }

            Logger.info('[Seeder] - Se cargaron los estados de las ecuaciones correctamente');
        }
    }
}

module.exports = EquationStatusSeeder

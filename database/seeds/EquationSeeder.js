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
const Equation = use('App/Models/Equation');
const csv = require('csvtojson');
const Logger = use('Logger');
const Helper = use('App/Helper/Utils');

const EQUATION_FILES = __dirname + '/files/equations/';

class EquationSeeder {
    async run() {
        if (Helper.isDirectory(EQUATION_FILES)) {
            let equationFiles = Helper.getDirectories(EQUATION_FILES);

            for (const file of equationFiles) {
                let equations = await csv().fromFile(EQUATION_FILES + file);
                let count = await Equation.query().where(equations[0]).getCount();

                if (count == 0)
                    var instance = await Equation.createMany(equations);
            }

            Logger.info('[Seeder] - Se cargaron las ecuaciones de busqueda correctamente');
        }
    }
}

module.exports = EquationSeeder

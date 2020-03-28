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

const EQUATION_FILES = __dirname + '/files/equations/equations.csv';

class EquationSeeder {
    async run() {
        let equations = await csv().fromFile(EQUATION_FILES);

        for (const equation of equations) {
            await Equation.findOrCreate(equation, equation);
        }

        Logger.info('Se cargaron las ecuaciones de busqueda correctamente', 'Seeder');
    }
}

module.exports = EquationSeeder

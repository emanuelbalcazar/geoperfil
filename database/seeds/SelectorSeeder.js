'use strict'

/*
|--------------------------------------------------------------------------
| SelectorSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Selector = use('App/Models/Selector');
const csv = require('csvtojson');
const Logger = use('Logger');
const Helper = use('App/Helper/Utils');

const SELECTOR_FILES = __dirname + '/files/selectors/';

class SelectorSeeder {
    async run() {
        if (Helper.isDirectory(SELECTOR_FILES)) {
            let selectorFiles = Helper.getDirectories(SELECTOR_FILES);

            for (const file of selectorFiles) {
                let selectors = await csv().fromFile(SELECTOR_FILES + file);
                let count = await Selector.query().where(selectors[0]).getCount();
                let instance = await Selector.createMany(selectors);
            }

            Logger.info('[Seeder] - Se cargaron los selectores correctamente');
        }
    }
}

module.exports = SelectorSeeder

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
const Site = use('App/Models/Site');

const csv = require('csvtojson');
const Logger = use('Logger');
const Helper = use('App/Helper/Utils');

const SELECTOR_FILES = __dirname + '/files/selectors/selectors.csv';

class SelectorSeeder {
    async run() {
        let selectors = await csv().fromFile(SELECTOR_FILES);

        for (const selector of selectors) {
            let site = await Site.query().where({ site: selector.site }).first();
            await Selector.findOrCreate({ selector: selector.selector }, { selector: selector.selector, site_id: site.id });
        }

        Logger.info('[Seeder] - Se cargaron los selectores correctamente');
    }
}

module.exports = SelectorSeeder

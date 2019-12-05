'use strict'

/*
|--------------------------------------------------------------------------
| SiteSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Site = use('App/Models/Site');
const csv = require('csvtojson');
const Logger = use('Logger');
const Helper = use('App/Helper/Utils');

const SITE_FILE = __dirname + '/files/sites/sites.csv';

class SiteSeeder {
    async run() {
        let sites = await csv().fromFile(SITE_FILE);

        for (const site of sites) {
            await Site.findOrCreate(site, site);
        }

        Logger.info('[Seeder] - Se cargaron los sitios web correctamente');
    }
}

module.exports = SiteSeeder

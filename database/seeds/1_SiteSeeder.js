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

const SITE_FILE = __dirname + '/files/sites/';

class SiteSeeder {
    async run() {
        if (Helper.isDirectory(SITE_FILE)) {
            let siteFiles = Helper.getDirectories(SITE_FILE);

            for (const file of siteFiles) {
                let sites = await csv().fromFile(SITE_FILE + file);
                let count = await Site.query().where(sites[0]).getCount();

                if (count == 0) {
                    let instance = await Site.createMany(sites);
                }
            }

            Logger.info('[Seeder] - Se cargaron los sitios web correctamente');
        }
    }
}

module.exports = SiteSeeder

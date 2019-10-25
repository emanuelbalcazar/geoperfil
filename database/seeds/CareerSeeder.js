'use strict'

/*
|--------------------------------------------------------------------------
| CareerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const Career = use('App/Models/Career');
const fs = require('fs');
const csv = require('csvtojson');
const Logger = use('Logger');

const CAREERS_FILES = __dirname + '/files/careers/';

class CareerSeeder {
    async run() {
        if (isDirectory(CAREERS_FILES)) {
            let careersFiles = getDirectories(CAREERS_FILES);

            for (const file of careersFiles) {
                let career = await csv().fromFile(CAREERS_FILES + file);
                let count = await Career.query().where(career[0]).getCount();

                if (count == 0) {
                    let instance = await Career.create(career[0]);
                }

            }

            Logger.info('[Seeder] - Se cargaron las carreras correctamente');
        }
    }
}

const isDirectory = source => fs.lstatSync(source).isDirectory();

const getDirectories = source => fs.readdirSync(source);

module.exports = CareerSeeder

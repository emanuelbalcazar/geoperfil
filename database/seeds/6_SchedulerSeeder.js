'use strict'

/*
|--------------------------------------------------------------------------
| SchedulerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Scheduler = use('App/Models/Scheduler');
const csv = require('csvtojson');
const Logger = use('Logger');
const Helper = use('App/Helper/Utils')

const SCHEDULER_FILES = __dirname + '/files/schedulers/';

class SchedulerSeeder {
    async run() {
        if (Helper.isDirectory(SCHEDULER_FILES)) {
            let schedulerFiles = Helper.getDirectories(SCHEDULER_FILES);

            for (const file of schedulerFiles) {
                let schedulers = await csv().fromFile(SCHEDULER_FILES + file);
                let count = await Scheduler.query().where(schedulers[0]).getCount();

                if (count == 0) {
                    let instance = await Scheduler.create(schedulers[0]);
                }
            }

            Logger.info('[Seeder] - Se cargaron los planificadores correctamente');
        }

    }
}

module.exports = SchedulerSeeder

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

const SCHEDULER_FILES = __dirname + '/files/schedulers/schedulers.csv';

class SchedulerSeeder {
    async run() {
        let schedulers = await csv().fromFile(SCHEDULER_FILES);

        for (const scheduler of schedulers) {
            await Scheduler.findOrCreate(scheduler, scheduler);
        }

        Logger.info('[Seeder] - Se cargaron los planificadores correctamente');
    }
}

module.exports = SchedulerSeeder

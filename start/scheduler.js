const SchedulerTask = require('../app/Tasks/SchedulerTask');
const Scheduler = use('App/Models/Scheduler');
const Logger = use('Logger');
const DEFAULT_SCHEDULER = 'scheduler';

const scheduler = new SchedulerTask(DEFAULT_SCHEDULER);

async function start() {
    let active = await Scheduler.isActive(DEFAULT_SCHEDULER);

    if (active) {
        Logger.info('Iniciando planificador...');
        await scheduler.configure();
        await scheduler.run();
    }
}

start();


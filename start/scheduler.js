const SchedulerTask = require('../app/Tasks/Scheduler');
const DEFAULT_SCHEDULER = 'scheduler';

const scheduler = new SchedulerTask(DEFAULT_SCHEDULER);

async function start() {
    await scheduler.configure();
    await scheduler.run();
}

start();


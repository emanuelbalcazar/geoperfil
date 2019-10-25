'use strict'

const Equation = use('App/Models/Equation')
const Scheduler = use('App/Models/Scheduler')
const ExtractorManager = use('ExtractorManager');
const Logger = use('Logger');
const nodeScheduler = require('node-schedule');

// TODO get from database
const GOOGLE_REQUEST_LIMIT = 5;

class SchedulerTask {

    /**
     * Creates an instance of SchedulerTask.
     * @param {String} name for scheduler
     * @memberof SchedulerTask
     */
    constructor(name) {
        this.job = {};
        this.name = name;
    }

    /**
     * Configure params
     * @memberof SchedulerTask
     */
    async configure() {
        this.dailyExecution = false;
        this.requestCount = 0;
        this.nextDay = await Scheduler.getNextDay(this.name);
        this.nextMonth = await Scheduler.getNextMonth(this.name);
        this.currentSchedule = (this.dailyExecution) ? this.nextDay : this.nextMonth;
    }

    /**
     * Start the scheduler
     * @memberof SchedulerTask
     */
    async run() {
        this.job = nodeScheduler.scheduleJob(this.currentSchedule, async (fireDate) => {
            let index = 0;
            let equations = await Equation.getNotCurrentlyExecuted();
            // si hay ecuaciones sin ejecutar, asumo que ejecutara todos los dias
            this.dailyExecution = (equations.length > 0) ? true : false;

            Logger.info('[Scheduler] - Cantidad de ecuaciones sin ejecutar: ' + equations.length);

            while (this.requestCount <= GOOGLE_REQUEST_LIMIT && index < equations.length) {
                let equation = equations[index];

                // si la ecuacion no supera el limite, la ejecuto y actualizo su ultima ejecucion
                if ((this.requestCount + equation.limit) <= GOOGLE_REQUEST_LIMIT) {
                    //equation.selectors = equation.selectors.map(selector => selector.selector);
                    //let result = await ExtractorManager.execute('default', equation, equation.selectors);
                    await Equation.updateLastExecution(equation.id, new Date().getMonth() + 1);
                    this.requestCount += equation.limit;
                } else {
                    Logger.info('[Scheduler] - Numero de request limite alcanzado, cambiando a modo de ejecucion diaria');
                    this.dailyExecution = true;
                }

                index++;
            }

            this.currentSchedule = (this.dailyExecution) ? this.nextDay : this.nextMonth;
            console.log(this.currentSchedule)
            this.requestCount = 0;
            this.job.reschedule(this.currentSchedule);  // se replanifica el scheduler
        });
    }

    /**
     * Stop job execution
     * @memberof SchedulerTask
     */
    async stop() {
        this.job.cancel();
    }
}

module.exports = SchedulerTask;

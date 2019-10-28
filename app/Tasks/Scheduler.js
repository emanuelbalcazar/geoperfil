'use strict'

const Equation = use('App/Models/Equation')
const Scheduler = use('App/Models/Scheduler')
const ExtractorManager = use('ExtractorManager');
const Logger = use('Logger');
const nodeScheduler = require('node-schedule');

// TODO get from database
const GOOGLE_REQUEST_LIMIT = 4;

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
        this.dailyExecution = true;
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
            Logger.info(`[Scheduler][${this.currentSchedule}] - Ejecutando planificador en: ${fireDate}`);

            let index = 0;
            let equations = await Equation.getNotCurrentlyExecuted();
            // si hay ecuaciones sin ejecutar, asumo que ejecutara todos los dias
            this.dailyExecution = (equations.length > 0) ? true : false;

            Logger.info(`[Scheduler][${this.currentSchedule}] - Cantidad de ecuaciones sin ejecutar: ${equations.length}`);

            while (this.requestCount <= GOOGLE_REQUEST_LIMIT && index < equations.length) {
                let equation = equations[index];

                // si la ecuacion no supera el limite, la ejecuto y actualizo su ultima ejecucion
                if ((this.requestCount + equation.limit) <= GOOGLE_REQUEST_LIMIT) {
                    let selectors = equation.selectors.map(selector => selector.selector);
                    delete equation.selectors;
                    Logger.info(`[Scheduler][${this.currentSchedule}] - Ejecutando ecuacion de id: ${equation.id}`)

                    //await sleep(5000);

                    await Equation.updateLastExecution(equation.id, new Date().getMonth() + 1);
                    let result = await ExtractorManager.execute('default', equation, selectors);

                    console.log('termino de ejecutar la ecuacion', equation.id);

                    this.requestCount += equation.limit;
                    await Scheduler.setRequestCount(this.name, this.requestCount);
                } else {
                    Logger.info(`[Scheduler][${this.currentSchedule}] - Limite de cantida de request alcanzada, request realizados: ${this.requestCount}`);
                    this.dailyExecution = true;
                }

                index++;
            }

            this.currentSchedule = (this.dailyExecution) ? this.nextDay : this.nextMonth;
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

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

module.exports = SchedulerTask;

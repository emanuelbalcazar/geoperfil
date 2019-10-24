'use strict'

const Equation = use('App/Models/Equation')
const Scheduler = use('App/Models/Scheduler')
const ExtractorManager = use('ExtractorManager');
const Logger = use('Logger');
const nodeScheduler = require('node-schedule');

//let nextDay = '*/5 * * * * *';
//let nextMonth = '*/10 * * * * *';

const GOOGLE_REQUEST_LIMIT = 5;

class SchedulerTask {

    constructor(name) {
        this.job = {};
        this.name = name;
    }

    async configure() {
        this.dailyExecution = false // se deduce de la cantidad de ecuaciones sin ejecutar
        this.requestCount = 0;
        this.nextDay = await Scheduler.getNextDay(this.name);
        this.nextMonth = await Scheduler.getNextMonth(this.name);
        this.currentSchedule = (this.dailyExecution) ? this.nextDay : this.nextMonth;
    }

    async reset() {
        await Scheduler.setDailyExecution(this.name, false);
        await Scheduler.setRequestCount(this.name, 0);
    }

    async run() {
        this.job = nodeScheduler.scheduleJob(this.currentSchedule, async (fireDate) => {
            Logger.info('[Scheduler] - Iniciando tarea en tiempo: ' + fireDate);
            let index = 0;
            let equations = await Equation.getNotCurrentlyExecuted();
            this.dailyExecution = (equations.length > 0) ? true : false;
            Logger.info('[Scheduler] - Cantidad de ecuaciones sin ejecutar: ' + equations.length);

            while (this.requestCount <= GOOGLE_REQUEST_LIMIT && index < equations.length) {
                let equation = equations[index];

                if ((this.requestCount + equation.limit) <= GOOGLE_REQUEST_LIMIT) {
                    //equation.selectors = equation.selectors.map(selector => selector.selector);
                    //let result = await ExtractorManager.execute('default', equation, equation.selectors);
                    await Equation.updateLastExecution(equation.id, new Date().getMonth() + 1);
                    this.requestCount += equation.limit;
                    this.dailyExecution = false;
                } else {
                    Logger.info('[Scheduler] - Numero de request limite alcanzado, cambiando a modo de ejecucion diaria');
                    this.dailyExecution = true;
                }

                index++;
            }

            this.currentSchedule = (this.dailyExecution) ? this.nextDay : this.nextMonth;
            this.requestCount = 0;
            this.job.reschedule(this.currentSchedule);
        });
    }

    async stop() {
        this.job.cancel();
    }
}


module.exports = SchedulerTask;

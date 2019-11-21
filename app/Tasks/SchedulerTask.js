'use strict'

const Equation = use('App/Models/Equation')
const Scheduler = use('App/Models/Scheduler')
const ExtractorManager = use('ExtractorManager');
const Logger = use('Logger');
const nodeScheduler = require('node-schedule');

// amount of limit pages allowed by google.
const PAGE_LIMIT = 10;

/**
 * @class SchedulerTask
 */
class SchedulerTask {

    /**
     * Creates an instance of SchedulerTask.
     * @param {String} name
     * @memberof SchedulerTask
     */
    constructor(name) {
        this.job = {};
        this.name = name;
    }

    /**
     * Configure the scheduler.
     * @memberof SchedulerTask
     */
    async configure() {
        this.dailyExecution = true;
        this.requestCount = 0;
        this.nextDay = await Scheduler.getNextDay(this.name);
        this.nextMonth = await Scheduler.getNextMonth(this.name);
        this.requestLimit = await Scheduler.getRequestLimit(this.name);
        this.pageLimit = PAGE_LIMIT;
        this.currentSchedule = (this.dailyExecution) ? this.nextDay : this.nextMonth;
    }

    /**
     * @memberof SchedulerTask
     */
    async run() {
        this.job = nodeScheduler.scheduleJob(this.currentSchedule, async (fireDate) => {

            Logger.info(`[Scheduler][${this.currentSchedule}] - Ejecutando planificador en: ${fireDate}`);

            let equations = await Equation.getNotCurrentlyExecuted();
            let currentEquation = {};
            this.dailyExecution = (equations.length > 0) ? true : false;

            let index = 0;
            let selectors = [];
            let startIndex = 1;
            let records = {};
            let currentPage = 1;

            while (index < equations.length && this.requestCount < this.requestLimit) {

                // obtengo la proxima ecuacion a ejecutar
                currentEquation = equations[index];
                // si aun tengo request disponibles y debo continuar buscando, actualizo el start con el nuevo start index.
                currentEquation.start = (startIndex > currentEquation.start) ? startIndex : currentEquation.start;

                Logger.info(`[Scheduler][${this.currentSchedule}] - Ejecutando la ecuacion: ${currentEquation.id} desde la pagina ${currentEquation.start}`);

                // calculo la pagina actual en caso de agarrar una ecuacion ejecutada a medias.
                currentPage = Math.ceil(currentEquation.start / this.pageLimit);

                // si la ecuacion tiene selectores, la ejecuto (sin selectores no puede obtener texto).
                selectors = currentEquation.selectors.map(selector => selector.selector);
                records = await ExtractorManager.execute('default', currentEquation, selectors);
                this.requestCount++;

                Logger.info(`[Scheduler][${this.currentSchedule}] - Termino la ecuacion: ${currentEquation.id} desde la pagina ${currentEquation.start}`);

                // si llegue a la ultima pagina, actualizo la ultima ejecucion de la ecuacion y reinicio el start
                // sino avanzo de pagina e incremento el indice para arrancar en la sig pagina
                if (currentPage == records.lastPage) {
                    await Equation.updateLastExecution(currentEquation.id, new Date().getMonth() + 1);
                    await Equation.updateStartIndex(currentEquation.id, 1);
                    index++;
                    currentPage = 1;
                } else {
                    currentPage++;
                    startIndex = Number(records.nextIndex);
                    await Equation.updateStartIndex(currentEquation.id, startIndex);
                }
            }

            // si falto ejecutar actualizo start de la ecuacion
            if (currentPage < records.lastPage) {
                await Equation.updateStartIndex(currentEquation.id, startIndex);
            }

            this.currentSchedule = (this.dailyExecution) ? this.nextDay : this.nextMonth;
            this.requestCount = 0;
            this.job.reschedule(this.currentSchedule);  // se replanifica el scheduler
            Logger.info(`[Scheduler][${this.currentSchedule}] - Limite de ${this.requestLimit} alcanzado, cambiando a modo ${this.currentSchedule}`);
        });
    }
}

module.exports = SchedulerTask;


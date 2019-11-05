'use strict'

const Equation = use('App/Models/Equation')
const Scheduler = use('App/Models/Scheduler')
const ExtractorManager = use('ExtractorManager');
const Logger = use('Logger');
const nodeScheduler = require('node-schedule');

class SchedulerTask {

    constructor(name) {
        this.job = {};
        this.name = name;
    }

    async configure() {
        this.dailyExecution = true;
        this.requestCount = 0;
        this.nextDay = await Scheduler.getNextDay(this.name);
        this.nextMonth = await Scheduler.getNextMonth(this.name);
        this.requestLimit = 5 //await Scheduler.getRequestLimit(this.name);
        this.pageLimit = 10;
        this.currentSchedule = '*/20 * * * * *' //(this.dailyExecution) ? this.nextDay : this.nextMonth;
    }

    async run() {
        this.job = nodeScheduler.scheduleJob(this.currentSchedule, async (fireDate) => {

            Logger.info(`[Scheduler][${this.currentSchedule}] - Ejecutando planificador en: ${fireDate}`);

            let equations = await Equation.getNotCurrentlyExecuted();
            let currentEquation = {};
            console.log('0 - Ecuaciones sin ejecutar:', equations.length);

            this.dailyExecution = (equations.length > 0) ? true : false;

            let index = 0;
            let selectors = [];
            let startIndex = 1;
            let records = {};
            let currentPage = 1;

            while (index < equations.length && this.requestCount < this.requestLimit) {

                // obtengo la proxima ecuacion a ejecutar
                currentEquation = equations[index];
                console.log('\n1 - Tomando ECUACION:', currentEquation);

                // calculo la pagina actual en caso de agarrar una ecuacion ejecutada a medias.
                currentPage = Math.ceil(currentEquation.start / this.pageLimit);

                console.log('2 - Pagina actual:', currentPage);

                // si la ecuacion tiene selectores, la ejecuto (sin selectores no puede obtener texto).
                selectors = currentEquation.selectors.map(selector => selector.selector);
                //delete equation.selectors;
                console.log('3 - Iniciando ejecucion de ecuacion:', currentEquation.id);

                records = await ExtractorManager.test('default', currentEquation, selectors);
                console.log('4 - Termino de ejecutar ecuacion, ultima pagina y cantidad de resultados', currentEquation.id, records.lastPage, records.totalResults);
                this.requestCount++;
                console.log('5 - Request numero:', this.requestCount);

                // si llegue a la ultima pagina, actualizo la ultima ejecucion de la ecuacion
                // sino avanzo de pagina e incremento el indice para arrancar en la sig pagina
                if (currentPage == records.lastPage) {
                    console.log('Llegue a la ultima pagina, actualizando ultima ejecucion al mes actual');
                    await Equation.updateLastExecution(currentEquation.id, new Date().getMonth() + 1);
                    index++;
                    currentPage = 1;
                } else {
                    currentPage++;
                    startIndex = Number(records.nextIndex);
                    console.log('Faltan paginas, pasando a la pagina siguiente:', currentPage, startIndex);
                }
            }

            // si falto ejecutar actualizo start de la ecuacion
            if (currentPage < records.lastPage) {
                console.log('[] No se pudo completar la ecuacion:', currentEquation.id);
                console.log('[] Cantidad de request hechos:', this.requestCount);
                console.log('Actualizar el start index de la ecuacion prro', startIndex);
                await Equation.updateStartIndex(currentEquation.id, startIndex);
            }

            this.currentSchedule = (this.dailyExecution) ? this.nextDay : this.nextMonth;
            this.requestCount = 0;
            this.job.reschedule(this.currentSchedule);  // se replanifica el scheduler
        });
    }
}

module.exports = SchedulerTask;


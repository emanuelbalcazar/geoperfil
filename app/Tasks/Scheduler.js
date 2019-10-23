'use strict'

const Equation = use('App/Models/Equation')
const ExtractorManager = use('ExtractorManager');
const scheduler = require('node-schedule');

let nextDay = '*/5 * * * * *';
let nextMonth = '*/10 * * * * *';
const GOOGLE_LIMIT = 5;


class Scheduler {

    constructor() {
        this.job = {};
    }

    async run() {
        this.job = scheduler.scheduleJob(nextMonth, async (fireDate) => {
            let requestCount = 0;
            let index = 0;
            let replanificarPorDia = false

            console.log('Ejecutando tarea en:', fireDate);

            let equations = await Equation.query().with('selectors').where({ active: true }).whereNot({ lastExecution: new Date().getMonth() + 1 }).fetch()
            equations = equations.toJSON();

            while (requestCount <= GOOGLE_LIMIT && index < equations.length) {
                let equation = equations[index];

                if ((requestCount + equation.limit) <= GOOGLE_LIMIT) {
                    //equation.selectors = equation.selectors.map(selector => selector.selector);
                    //let result = await ExtractorManager.execute('default', equation, equation.selectors);
                    console.log('Ejecutando ecuacion', equation.id);
                    await Equation.query().where({ id: equation.id }).update({ lastExecution: new Date().getMonth() + 1 });
                    requestCount += equation.limit;
                } else {
                    // avisar que hay que replanificar con una bandera
                    replanificarPorDia = true;
                }

                index++;
            }

            console.log('termino el while', replanificarPorDia)
            if (replanificarPorDia) {
                this.job.reschedule(nextDay);
            } else {
                this.job.reschedule(nextMonth);
            }

            // si la bandera indica que hay que replanificar, actualizarlo para el dia siguiente
            //this.job.reschedule(dia siguiente);

            // si la bandera de replanificacion es falso
            // ejecutar al mes siguiente
        });
    }
}


module.exports = new Scheduler()

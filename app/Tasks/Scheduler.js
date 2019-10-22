'use strict'

const Task = use('Task')
const Logger = use('Logger')
const Equation = use('App/Models/Equation')
const ExtractorManager = use('ExtractorManager');

class Scheduler extends Task {

    static get schedule() {
        return '*/2 * * * *'
    }

    async handle() {
        console.log('iniciando')
        let equations = await Equation.query().with('selectors').where({ active: true }).fetch()
        equations = equations.toJSON();

        for (let equation of equations) {
            console.log(equation);
            equation.selectors = equation.selectors.map(selector => selector.selector);
            let result = await ExtractorManager.execute('default', equation, equation.selectors);
            console.log(result.length)
        }
    }
}

module.exports = Scheduler

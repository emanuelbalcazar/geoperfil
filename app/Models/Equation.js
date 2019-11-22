'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Equation extends Model {

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    status() {
        return this.belongsTo('App/Models/EquationStatus');
    }

    /* relation equation-articles */
    articles() {
        return this.belongsToMany('App/Models/Article').pivotTable('equation_articles')
    }

    static async getNotCurrentlyExecuted() {
        let equations = await this.query().with('selectors').where({ active: true }).whereNot({ lastExecution: new Date().getMonth() + 1 }).fetch();
        return equations.toJSON();
    }

}

module.exports = Equation

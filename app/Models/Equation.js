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

    sites() {
        return this.hasMany('App/Models/Site');
    }

    /* relation equation-articles */
    articles() {
        return this.belongsToMany('App/Models/Article').pivotTable('equation_articles')
    }

    static async getNotCurrentlyExecuted() {
        let equations = await this.query().with('selectors').where({ active: true }).whereNot({ lastExecution: new Date().getMonth() + 1 }).fetch();
        return equations.toJSON();
    }

    static async updateLastExecution(id, lastExecution) {
        let updated = await this.query().where({ id: id }).update({ lastExecution: lastExecution });
        return updated;
    }

    static async updateStartIndex(id, start) {
        let updated = await this.query().where({ id: id }).update({ start: start });
        return updated;
    }
}

module.exports = Equation

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class EquationStatus extends Model {

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    equation() {
        return this.hasOne('App/Models/Equation', 'equation_id', 'id');
    }

    site() {
        return this.hasOne('App/Models/Site', 'site_id', 'id');
    }

    static async getNotCurrentlyExecuted() {
        let equations = await this.query().with('equation')
            .with('site', (builder) => { builder.with('selectors') })
            .where({ active: true })
            .whereNot({ lastExecution: new Date().getMonth() + 1 }).fetch();

        return equations.toJSON();
    }

    static async updateStartIndex(id, start) {
        let updated = await this.query().where({ id: id }).update({ start: start });
        return updated;
    }

    static async updateLastExecution(id, lastExecution) {
        let updated = await this.query().where({ id: id }).update({ lastExecution: lastExecution });
        return updated;
    }
}

module.exports = EquationStatus

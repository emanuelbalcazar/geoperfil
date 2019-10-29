'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Scheduler extends Model {

    static get createdAtColumn() {
        return null;
    }

    static get updatedAtColumn() {
        return null;
    }

    static async getCurrentSchedule(name) {
        let record = await this.query().select('currentSchedule').where({ name: name }).first();
        return record.toJSON().currentSchedule;
    }

    static async setCurrentSchedule(name, current) {
        return await this.query().where('name', name).update({ currentSchedule: current });
    }

    static async getNextDay(name) {
        let record = await this.query().select('nextDay').where('name', name).first();
        return record.toJSON().nextDay;
    }

    static async getNextMonth(name) {
        let record = await this.query().select('nextMonth').where('name', name).first();
        return record.toJSON().nextMonth;
    }

    static async getRequestCount(name) {
        let record = await this.query().select('requestCount').where('name', name).first();
        return record.toJSON().requestCount;
    }

    static async setRequestCount(name, count) {
        return await this.query().where('name', name).update({ requestCount: count });
    }

    static async getDailyExecution(name) {
        let record = await this.query().select('dailyExecution').where('name', name).first();
        return record.toJSON().dailyExecution;
    }

    static async setDailyExecution(name, dailyExecutionStatus) {
        return await this.query().where('name', name).update({ dailyExecution: dailyExecutionStatus });
    }

    static async getRequestLimit(name) {
        let record = await this.query().select('requestLimit').where('name', name).first();
        return record.toJSON().requestLimit;
    }
}

module.exports = Scheduler

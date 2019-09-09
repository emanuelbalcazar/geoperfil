'use strict'

const Task = use('Task')
const Logger = use('Logger')

class Test extends Task {

    static get schedule() {
        return '*/3 * * * * *'
    }

    async handle() {
        Logger.info('Task Test handle 3 seconds')
    }
}

module.exports = Test

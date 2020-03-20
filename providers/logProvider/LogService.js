const Log = use('App/Models/Log');

/**
 * @class LogService
 */
class LogService {

    /**
     * Creates an instance of LogService.
     * @memberof LogService
     */
    constructor() { }

    async info(message, module = 'desconocido') {
        await Log.create({ level: 'info', message: message, module: module });
    }

    async error(message, module = '') {
        await Log.create({ level: 'error', message: message, module: module });
    }

    async debug(message, module = '') {
        await Log.create({ level: 'debug', message: message, module: module });
    }

    async warn(message, module = '') {
        await Log.create({ level: 'warn', message: message, module: module });
    }
}

module.exports = LogService;

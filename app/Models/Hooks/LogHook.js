'use strict'
const Env = use('Env');
const Chalk = require('chalk');

const LogHook = exports = module.exports = {}

LogHook.setTimestamp = async (modelInstance) => {
    modelInstance.timestamp = new Date().toLocaleString();
}

LogHook.print = async (modelInstance) => {
    let printLogs = (Env.get('PRINT_LOGS') == "true");

    if (printLogs) {
        let chalk = getChalk(modelInstance.level);
        console.log(chalk(`${modelInstance.timestamp} - [${modelInstance.level}] [${modelInstance.module}] - ${modelInstance.message}`));
    }
}

function getChalk(level) {
    let _chalk = Chalk;

    switch (level) {
        case 'info': return _chalk.blue;
        case 'warn': return _chalk.yellow;
        case 'error': return _chalk.red;
        case 'debug': return _chalk.white;
        default: return _chalk.cyan;
    }
}

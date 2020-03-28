'use strict'

const AlertHook = exports = module.exports = {}

AlertHook.setTimestamp = async (modelInstance) => {
    modelInstance.timestamp = new Date().toLocaleString();
}

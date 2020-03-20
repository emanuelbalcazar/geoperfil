const AlertResolver = require('./AlertResolver');

/**
 * @class DefaultResolver
 * @extends {AlertResolver}
 */
class DefaultResolver extends AlertResolver {

    /**
     * Creates an instance of DefaultResolver.
     * @memberof DefaultResolver
     */
    constructor() {
        super();
    }

    async accept(alert) {
        console.log('aceptando alerta:', alert);
    }

    async reject(alert) {
        console.log('rechazando alerta:', alert);
    }
}

module.exports = new DefaultResolver();

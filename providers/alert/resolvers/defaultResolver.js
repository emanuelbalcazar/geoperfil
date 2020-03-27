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
        console.log('Metodo de aceptar por defecto');
    }

    async reject(alert) {
        console.log('Metodo de rechazar por defecto');
    }
}

module.exports = new DefaultResolver();

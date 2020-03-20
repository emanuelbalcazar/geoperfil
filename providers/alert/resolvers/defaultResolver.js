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

    accept(alert) {

    }

    reject(alert) {

    }
}

module.exports = new DefaultResolver();

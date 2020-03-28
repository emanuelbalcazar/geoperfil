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
        return { alert: alert, updated: 0, success: false };
    }

    async reject(alert) {
        return { alert: alert, updated: 0, success: false };
    }
}

module.exports = new DefaultResolver();

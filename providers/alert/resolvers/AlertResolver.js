/**
 * Alert resolver interface.
 * @class AlertResolver
 */
class AlertResolver {

    /**
     * Creates an instance of AlertResolver.
     * @memberof AlertResolver
     */
    constructor() { }

    async accept(alert) {
        throw new Error('Accept must be implemented');
    }

    async reject(alert) {
        throw new Error('Reject must be implemented');
    }
}

module.exports = AlertResolver;

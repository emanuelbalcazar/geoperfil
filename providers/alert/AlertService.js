/**
 * @class AlertService
 */
class AlertService {

    /**
     * Creates an instance of AlertService.
     * @memberof AlertService
     */
    constructor() { }

    /**
     * @param {String} type of alert
     * @returns resolver
     * @memberof AlertService
     */
    getResolver(type = 'defaultResolver') {
        try {
            let resolver = require('./' + type);
            return resolver;
        } catch (e) {
            let defaultResolver = require('./resolvers/defaultResolver');
            return defaultResolver;
        }
    };

    /**
     * @param {Alert} alert
     * @memberof AlertService
     */
    async accept(alert) {
        let resolver = this.getResolver(alert.type);
        await resolver.accept();
        return;
    }

    /**
     * @param {Alert} alert
     * @memberof AlertService
     */
    async reject(alert) {
        let resolver = this.getResolver(alert.type);
        await resolver.reject();
        return;
    }
}

module.exports = AlertService;

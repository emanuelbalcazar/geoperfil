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
    accept(alert) {
        let resolver = this.getResolver(alert.type);
        resolver.accept();
    }

    /**
     * @param {Alert} alert
     * @memberof AlertService
     */
    reject(alert) {
        let resolver = this.getResolver(alert.type);
        resolver.reject();
    }
}

module.exports = AlertService;

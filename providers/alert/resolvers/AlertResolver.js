const Alert = use('App/Models/Alert');

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

    /**
     * @param {Alert} alert
     * @returns
     * @memberof AlertResolver
     */
    async accept(alert) {
        let updated = await Alert.query().where('id', alert.id).update({ status: 'accepted' });
        return { alert: alert, updated: updated, success: true };
    }

    /**
     * @param {Alert} alert
     * @returns
     * @memberof AlertResolver
     */
    async reject(alert) {
        let updated = await Alert.query().where('id', alert.id).update({ status: 'rejected' });
        return { alert: alert, updated: updated, success: true };
    }
}

module.exports = AlertResolver;

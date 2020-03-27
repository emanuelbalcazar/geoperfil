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

    async accept(alert) {
        let updated = await Alert.query().where('id', alert.id).update({ status: 'accepted' });
        return { alert: alert, updated: updated, success: true };
    }

    async reject(alert) {
        let updated = await Alert.query().where('id', alert.id).update({ status: 'rejected' });
        return { alert: alert, updated: updated, success: true };
    }
}

module.exports = AlertResolver;

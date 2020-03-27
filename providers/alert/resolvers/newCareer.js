const AlertResolver = require('./AlertResolver');
const Alert = use('App/Models/Alert');
const Career = use('App/Models/Career');

class NewCaareerResolver extends AlertResolver {

    constructor() {
        super();
    }

    async accept(alert) {
        let career = await Career.create({ name: alert.data });
        let updated = await Alert.query().where('id', alert.id).update({ status: 'accepted' });
        return updated;
    }

    async reject(alert) {
        let updated = await Alert.query().where('id', alert.id).update({ status: 'rejected' });
        return updated;
    }
}

module.exports = new NewCaareerResolver();

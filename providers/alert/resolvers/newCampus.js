const AlertResolver = require('./AlertResolver');
const Alert = use('App/Models/Alert');
const Campus = use('App/Models/Campus');

class NewCampusResolver extends AlertResolver {

    constructor() {
        super();
    }

    async accept(alert) {
        let campus = await Campus.findOrCreate({ name: alert.data }, { name: alert.data });
        return await super.accept(alert);
    }

    async reject(alert) {
        return await super.reject(alert);
    }
}

module.exports = new NewCampusResolver();

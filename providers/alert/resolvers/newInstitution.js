const AlertResolver = require('./AlertResolver');
const Alert = use('App/Models/Alert');
const Institution = use('App/Models/Institution');

class NewInstitutionResolver extends AlertResolver {

    constructor() {
        super();
    }

    async accept(alert) {
        let institution = await Institution.findOrCreate({ name: alert.data }, { name: alert.data });
        return await super.accept(alert);
    }

    async reject(alert) {
        return await super.reject(alert);
    }
}

module.exports = new NewInstitutionResolver();

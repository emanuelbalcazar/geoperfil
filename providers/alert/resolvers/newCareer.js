const AlertResolver = require('./AlertResolver');
const Alert = use('App/Models/Alert');
const Career = use('App/Models/Career');

class NewCaareerResolver extends AlertResolver {

    constructor() {
        super();
    }

    async accept(alert) {
        let career = await Career.findOrCreate({ name: alert.data }, { name: alert.data });
        return await super.accept(alert);
    }

    async reject(alert) {
        return await super.reject(alert);
    }
}

module.exports = new NewCaareerResolver();

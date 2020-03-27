const AlertResolver = require('./AlertResolver');
const Alert = use('App/Models/Alert');

class NewCampusResolver extends AlertResolver {

    constructor() {
        super();
    }

    async accept(alert) {

    }

    async reject(alert) {

    }
}

module.exports = new NewCampusResolver();

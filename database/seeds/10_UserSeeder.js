'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User');
const csv = require('csvtojson');
const Logger = use('Logger');
const Helper = use('App/Helper/Utils');

const USER_FILES = __dirname + '/files/users/users.csv';

class UserSeeder {
    async run() {
        let users = await csv().fromFile(USER_FILES);

        for (const user of users) {
            await User.findOrCreate({email: user.email}, user);
        }

        Logger.info('Se cargaron los usuarios correctamente', 'Seeder');
    }
}

module.exports = UserSeeder

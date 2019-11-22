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

const USER_FILES = __dirname + '/files/users/';

class UserSeeder {
    async run() {
        if (Helper.isDirectory(USER_FILES)) {
            let userFiles = Helper.getDirectories(USER_FILES);

            for (const file of userFiles) {
                let users = await csv().fromFile(USER_FILES + file);
                let count = await User.query().where(users[0]).getCount();

                if (count == 0) {
                    let instance = await User.create(users[0]);
                }
            }

            Logger.info('[Seeder] - Se cargaron los usuarios correctamente');
        }
    }
}

module.exports = UserSeeder

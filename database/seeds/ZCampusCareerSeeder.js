'use strict'

/*
|--------------------------------------------------------------------------
| CampusCareerSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const CampusCareer = use('App/Models/CampusCareer');
const csv = require('csvtojson');
const Logger = use('Logger');
const Helper = use('App/Helper/Utils')

const CAMPUSCAREERS_FILES = __dirname + '/files/campuscareers/';

class CampusCareerSeeder {
  async run () {
    if (Helper.isDirectory(CAMPUSCAREERS_FILES)) {
      let campusCareersFiles = Helper.getDirectories(CAMPUSCAREERS_FILES);

      for (const file of campusCareersFiles) {
          let campusCareer = await csv().fromFile(CAMPUSCAREERS_FILES + file);
          let count = await CampusCareer.query().where(campusCareer[0]).getCount();

          if (count == 0) {
              let instance = await CampusCareer.createMany(campusCareer);
          }

      }

      Logger.info('[Seeder] - Se cargaron las relaciones entre sedes y carreras correctamente');
  }
  }
}

module.exports = CampusCareerSeeder

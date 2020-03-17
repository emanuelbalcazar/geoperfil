'use strict'

/*
|--------------------------------------------------------------------------
| CitySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const csv = require('csvtojson');

const City = use( 'App/Models/City');
const Province = use( 'App/Models/Province' );
const Logger = use('Logger');

const CITIES_FILE = __dirname + '/files/cities/cities.csv';


class CitySeeder {
  async run () {
      let cities = await csv().fromFile(CITIES_FILE);

      for (let city of cities) {
        let prov = await Province.query().where({ name: city.province }).first();
        await City.create( {name: city.name, centroid_lat: city.centroid_lat, centroid_lon: city.centroid_lon, province_id: prov.id } );
      }
      Logger.info('[Seeder] - Se cargaron las ciudades correctamente');
  }
}

module.exports = CitySeeder

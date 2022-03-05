'use strict'

/*
|--------------------------------------------------------------------------
| HeatingAndWaterEventFieldSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class HeatingAndWaterEventFieldSeeder {
  async run () {
    await Factory
      .model('App/Models/HeatingAndWaterEventField')
      .create()
  }
}

module.exports = HeatingAndWaterEventFieldSeeder

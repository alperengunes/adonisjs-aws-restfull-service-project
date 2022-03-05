'use strict'

/*
|--------------------------------------------------------------------------
| HomePageWaterServiceSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class HomePageWaterServiceSeeder {
  async run () {
    await Factory
      .model('App/Models/HomePageWaterService')
      .create()
  }
}

module.exports = HomePageWaterServiceSeeder

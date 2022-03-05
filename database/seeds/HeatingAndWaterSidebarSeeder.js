'use strict'

/*
|--------------------------------------------------------------------------
| HeatingAndWaterSidebarSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class HeatingAndWaterSidebarSeeder {
  async run () {
    await Factory
      .model('App/Models/HeatingAndWaterSideBar')
      .create()
  }
}

module.exports = HeatingAndWaterSidebarSeeder

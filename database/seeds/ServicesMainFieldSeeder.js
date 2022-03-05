'use strict'

/*
|--------------------------------------------------------------------------
| ServicesMainFieldSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ServicesMainFieldSeeder {
  async run () {
    await Factory
    .model('App/Models/ServicesMainField')
    .create()
  }
}

module.exports = ServicesMainFieldSeeder

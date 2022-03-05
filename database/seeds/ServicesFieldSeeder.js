'use strict'

/*
|--------------------------------------------------------------------------
| ServicesFieldSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ServicesFieldSeeder {
  async run () {
    await Factory
    .model('App/Models/ServicesField')
    .create()
  }
}

module.exports = ServicesFieldSeeder

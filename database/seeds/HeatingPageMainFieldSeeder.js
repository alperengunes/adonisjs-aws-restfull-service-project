'use strict'

/*
|--------------------------------------------------------------------------
| HeatingPageMainFieldSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class HeatingPageMainFieldSeeder {
  async run () {
    await Factory
      .model('App/Models/HeatingPageMainField')
      .create()
  }
}

module.exports = HeatingPageMainFieldSeeder

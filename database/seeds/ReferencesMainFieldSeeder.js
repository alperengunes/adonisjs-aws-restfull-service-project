'use strict'

/*
|--------------------------------------------------------------------------
| ReferencesMainFieldSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ReferencesMainFieldSeeder {
  async run () {
    await Factory
      .model('App/Models/ReferencesMainField')
      .create()
  }
}

module.exports = ReferencesMainFieldSeeder

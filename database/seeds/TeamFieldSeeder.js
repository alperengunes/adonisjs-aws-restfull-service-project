'use strict'

/*
|--------------------------------------------------------------------------
| TeamFieldSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class TeamFieldSeeder {
  async run () {
    await Factory
      .model('App/Models/TeamField')
      .create()
  }
}

module.exports = TeamFieldSeeder

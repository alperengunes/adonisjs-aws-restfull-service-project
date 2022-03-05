'use strict'

/*
|--------------------------------------------------------------------------
| AboutMainFieldSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class AboutMainFieldSeeder {
  async run () {
    await Factory
      .model('App/Models/AboutMainField')
      .create()
  }
}

module.exports = AboutMainFieldSeeder

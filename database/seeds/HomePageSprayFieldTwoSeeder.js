'use strict'

/*
|--------------------------------------------------------------------------
| HomePageSprayFieldTwoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class HomePageSprayFieldTwoSeeder {
  async run () {
    await Factory
      .model('App/Models/HomePageSprayFieldTwo')
      .create()
  }
}

module.exports = HomePageSprayFieldTwoSeeder

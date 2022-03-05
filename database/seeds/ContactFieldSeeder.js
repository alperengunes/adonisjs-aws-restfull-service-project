'use strict'

/*
|--------------------------------------------------------------------------
| ContactFieldSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class ContactFieldSeeder {
  async run () {
    await Factory
      .model('App/Models/ContactField')
      .create()
  }
}

module.exports = ContactFieldSeeder

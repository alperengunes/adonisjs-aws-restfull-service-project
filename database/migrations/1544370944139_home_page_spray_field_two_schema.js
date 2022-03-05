'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomePageSprayFieldTwoSchema extends Schema {
  up () {
    this.create('home_page_spray_field_twos', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.timestamps()
    })
  }

  down () {
    this.drop('home_page_spray_field_twos')
  }
}

module.exports = HomePageSprayFieldTwoSchema

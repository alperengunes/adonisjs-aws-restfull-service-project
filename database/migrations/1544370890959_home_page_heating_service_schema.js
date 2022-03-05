'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomePageHeatingServiceSchema extends Schema {
  up () {
    this.create('home_page_heating_services', (table) => {
      table.increments()
      table.string('main_header_tr').notNullable()
      table.string('main_header_en')
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.text('content_tr').notNullable()
      table.text('content_en')
      table.string('features_header_tr').notNullable()
      table.string('features_header_en')
      table.string('icon').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('home_page_heating_services')
  }
}

module.exports = HomePageHeatingServiceSchema

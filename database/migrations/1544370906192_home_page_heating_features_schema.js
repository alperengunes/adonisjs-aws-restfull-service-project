'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomePageHeatingFeaturesSchema extends Schema {
  up () {
    this.create('home_page_heating_features', (table) => {
      table.increments()
      table.integer('place').notNullable()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.text('content_tr').notNullable()
      table.text('content_en')
      table.string('icon').notNullable()
      table.timestamps()
    })
    this.raw('ALTER TABLE home_page_heating_features ADD FULLTEXT search (`header_tr`,`header_en`,`content_tr`,`content_en`)')
  }

  down () {
    this.drop('home_page_heating_features')
  }
}

module.exports = HomePageHeatingFeaturesSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomePageSliderSchema extends Schema {
  up () {
    this.create('home_page_sliders', (table) => {
      table.increments()
      table.integer('place').notNullable()
      table.string('header_tr').notNullable()
      table.string('image').notNullable()
      table.string('header_en')
      table.text('content_tr').notNullable()
      table.text('content_en')
      table.string('href')
      table.timestamps()
    })
    this.raw('ALTER TABLE home_page_sliders ADD FULLTEXT search (`header_tr`,`header_en`,`content_tr`,`content_en`,`href`)')
  }

  down () {
    this.drop('home_page_sliders')
  }
}

module.exports = HomePageSliderSchema

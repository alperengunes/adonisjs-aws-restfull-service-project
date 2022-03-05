'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomePageSliderUnderSchema extends Schema {
  up () {
    this.create('home_page_slider_unders', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.text('content_tr').notNullable()
      table.text('content_en')
      table.string('href')
      table.timestamps()
    })
  }

  down () {
    this.drop('home_page_slider_unders')
  }
}

module.exports = HomePageSliderUnderSchema

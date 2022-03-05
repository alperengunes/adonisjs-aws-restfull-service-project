'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomePageSprayFieldOneSchema extends Schema {
  up () {
    this.create('home_page_spray_field_ones', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.timestamps()
    })
  }

  down () {
    this.drop('home_page_spray_field_ones')
  }
}

module.exports = HomePageSprayFieldOneSchema

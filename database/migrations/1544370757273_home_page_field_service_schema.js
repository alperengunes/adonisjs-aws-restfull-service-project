'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomePageFieldServiceSchema extends Schema {
  up () {
    this.create('home_page_field_services', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.timestamps()
    })
  }

  down () {
    this.drop('home_page_field_services')
  }
}

module.exports = HomePageFieldServiceSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HeatingPageMainFieldSchema extends Schema {
  up () {
    this.create('heating_page_main_fields', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.string('image').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('heating_page_main_fields')
  }
}

module.exports = HeatingPageMainFieldSchema

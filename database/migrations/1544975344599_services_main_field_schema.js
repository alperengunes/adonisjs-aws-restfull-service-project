'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServicesMainFieldSchema extends Schema {
  up () {
    this.create('services_main_fields', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.string('image').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('services_main_fields')
  }
}

module.exports = ServicesMainFieldSchema

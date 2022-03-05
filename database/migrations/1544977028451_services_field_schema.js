'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServicesFieldSchema extends Schema {
  up () {
    this.create('services_fields', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.timestamps()
    })
  }

  down () {
    this.drop('services_fields')
  }
}

module.exports = ServicesFieldSchema

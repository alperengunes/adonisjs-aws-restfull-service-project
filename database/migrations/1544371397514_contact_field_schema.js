'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContactFieldSchema extends Schema {
  up () {
    this.create('contact_fields', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.timestamps()
    })
  }

  down () {
    this.drop('contact_fields')
  }
}

module.exports = ContactFieldSchema

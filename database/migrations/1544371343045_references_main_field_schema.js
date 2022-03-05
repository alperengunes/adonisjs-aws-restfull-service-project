'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReferencesMainFieldSchema extends Schema {
  up () {
    this.create('references_main_fields', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.string('image').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('references_main_fields')
  }
}

module.exports = ReferencesMainFieldSchema

'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AboutSchema extends Schema {
  up () {
    this.create('abouts', (table) => {
      table.increments()
      table.string('main_header_field_tr').notNullable()
      table.string('main_header_field_en')
      table.text('content_tr').notNullable()
      table.text('content_en')
      table.string('image')
      table.timestamps()
    })
  }

  down () {
    this.drop('abouts')
  }
}

module.exports = AboutSchema

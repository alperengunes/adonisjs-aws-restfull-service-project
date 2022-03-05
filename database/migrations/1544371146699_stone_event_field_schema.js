'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoneEventFieldSchema extends Schema {
  up () {
    this.create('stone_event_fields', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.timestamps()
    })
  }

  down () {
    this.drop('stone_event_fields')
  }
}

module.exports = StoneEventFieldSchema

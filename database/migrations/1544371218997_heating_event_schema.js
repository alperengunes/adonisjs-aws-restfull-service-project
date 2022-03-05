'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HeatingEventSchema extends Schema {
  up () {
    this.create('heating_events', (table) => {
      table.increments()
      table.integer('heatingpage_id').unsigned().notNullable()
      table.integer('place').notNullable()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.text('content_tr').notNullable()
      table.text('content_en')
      table.string('image')
      table.timestamps()

      table.foreign('heatingpage_id').references('id').inTable('heating_pages')
    })
  }

  down () {
    this.drop('heating_events')
  }
}

module.exports = HeatingEventSchema

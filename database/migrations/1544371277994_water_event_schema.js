'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WaterEventSchema extends Schema {
  up () {
    this.create('water_events', (table) => {
      table.increments()
      table.integer('waterpage_id').unsigned().notNullable()
      table.integer('place').notNullable()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.text('content_tr').notNullable()
      table.text('content_en')
      table.string('image')
      table.timestamps()

      table.foreign('waterpage_id').references('id').inTable('water_pages')
    })
  }

  down () {
    this.drop('water_events')
  }
}

module.exports = WaterEventSchema

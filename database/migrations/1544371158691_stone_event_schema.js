'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StoneEventSchema extends Schema {
  up () {
    this.create('stone_events', (table) => {
      table.increments()
      table.integer('year').notNullable()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.timestamps()
    })
    this.raw('ALTER TABLE stone_events ADD FULLTEXT search (`header_tr`,`header_en`)')
  }

  down () {
    this.drop('stone_events')
  }
}

module.exports = StoneEventSchema

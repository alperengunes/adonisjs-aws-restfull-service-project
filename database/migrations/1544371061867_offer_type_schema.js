'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OfferTypeSchema extends Schema {
  up () {
    this.create('offer_types', (table) => {
      table.increments()
      table.integer('offerapplication_id').unsigned().notNullable()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.timestamps()

      table.foreign('offerapplication_id').references('id').inTable('offer_applications')
    })
    this.raw('ALTER TABLE offer_types ADD FULLTEXT search (`header_tr`,`header_en`)')
  }

  down () {
    this.drop('offer_types')
  }
}

module.exports = OfferTypeSchema

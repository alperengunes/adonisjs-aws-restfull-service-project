'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OfferApplicationSchema extends Schema {
  up () {
    this.create('offer_applications', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.timestamps()
    })
    this.raw('ALTER TABLE offer_applications ADD FULLTEXT search (`header_tr`,`header_en`)')
  }

  down () {
    this.drop('offer_applications')
  }
}

module.exports = OfferApplicationSchema

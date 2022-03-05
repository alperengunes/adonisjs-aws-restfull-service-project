'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OfferFormSchema extends Schema {
  up () {
    this.create('offer_forms', (table) => {
      table.increments()
      table.string('namesurname').notNullable()
      table.string('companyname')
      table.string('mail').notNullable()
      table.string('telephone').notNullable()
      table.text('message').notNullable()
      table.string('offerapplication').notNullable()
      table.string('offertype').notNullable()
      table.timestamps()
    })
    this.raw('ALTER TABLE offer_forms ADD FULLTEXT search (`namesurname`,`companyname`,`mail`,`telephone`,`message`,`offerapplication`,`offertype`)')
  }

  down () {
    this.drop('offer_forms')
  }
}

module.exports = OfferFormSchema

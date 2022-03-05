'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FixedContactSchema extends Schema {
  up () {
    this.create('fixed_contacts', (table) => {
      table.increments()
      table.text('adress').notNullable()
      table.string('telephone').notNullable()
      table.string('telephoneshop').notNullable()
      table.string('mail').notNullable()
      table.string('days_tr').notNullable()
      table.string('days_en')
      table.string('hour').notNullable()
      table.string('footer_tr').notNullable()
      table.string('footer_en')
      table.text('footer_content_tr').notNullable()
      table.text('footer_content_en')
      table.string('facebook_url')
      table.string('twitter_url')
      table.string('instagram_url')
      table.string('whatsapp_url')
      table.string('help_header_tr').notNullable()
      table.string('help_header_en')
      table.string('header_fix_tr').notNullable()
      table.string('header_fix_en')
      table.string('content_fix_tr').notNullable()
      table.string('content_fix_en')
      table.text('googlemaps_url')
      table.timestamps()
    })
  }

  down () {
    this.drop('fixed_contacts')
  }
}

module.exports = FixedContactSchema

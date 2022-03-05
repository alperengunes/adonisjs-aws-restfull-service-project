'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HeatingAndWaterContactBoxSchema extends Schema {
  up () {
    this.create('heating_and_water_contact_boxes', (table) => {
      table.increments()
      table.string('one_header_tr').notNullable()
      table.string('one_header_en')
      table.string('two_header_tr').notNullable()
      table.string('two_header_en')
      table.timestamps()
    })
  }

  down () {
    this.drop('heating_and_water_contact_boxes')
  }
}

module.exports = HeatingAndWaterContactBoxSchema

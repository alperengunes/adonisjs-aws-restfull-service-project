'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HeatingAndWaterEventFieldSchema extends Schema {
  up () {
    this.create('heating_and_water_event_fields', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.timestamps()
    })
  }

  down () {
    this.drop('heating_and_water_event_fields')
  }
}

module.exports = HeatingAndWaterEventFieldSchema

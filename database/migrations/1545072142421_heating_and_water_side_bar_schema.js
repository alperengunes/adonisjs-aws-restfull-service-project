'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HeatingAndWaterSideBarSchema extends Schema {
  up () {
    this.create('heating_and_water_side_bars', (table) => {
      table.increments()
      table.string('water_header_tr').notNullable()
      table.string('water_header_en')
      table.string('heating_header_tr').notNullable()
      table.string('heating_header_en')
      table.timestamps()
    })
  }

  down () {
    this.drop('heating_and_water_side_bars')
  }
}

module.exports = HeatingAndWaterSideBarSchema

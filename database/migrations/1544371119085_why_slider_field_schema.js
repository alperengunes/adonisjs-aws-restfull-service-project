'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WhySliderFieldSchema extends Schema {
  up () {
    this.create('why_slider_fields', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.timestamps()
    })
  }

  down () {
    this.drop('why_slider_fields')
  }
}

module.exports = WhySliderFieldSchema

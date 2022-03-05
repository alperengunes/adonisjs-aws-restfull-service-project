'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WhySliderSchema extends Schema {
  up () {
    this.create('why_sliders', (table) => {
      table.increments()
      table.text('content_tr').notNullable()
      table.text('content_en')
      table.string('image').notNullable()
      table.timestamps()
    })
    this.raw('ALTER TABLE why_sliders ADD FULLTEXT search (`content_tr`,`content_en`)')
  }

  down () {
    this.drop('why_sliders')
  }
}

module.exports = WhySliderSchema

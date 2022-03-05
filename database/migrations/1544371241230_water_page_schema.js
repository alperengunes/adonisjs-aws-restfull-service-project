'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WaterPageSchema extends Schema {
  up () {
    this.create('water_pages', (table) => {
      table.increments()
      table.integer('place').notNullable()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.text('content_tr').notNullable()
      table.text('content_en')
      table.text('content_short_tr').notNullable()
      table.text('content_short_en')
      table.string('slug').notNullable()
      table.string('image').notNullable()
      table.string('image_slider').notNullable()
      table.timestamps()
    })
    this.raw('ALTER TABLE `water_pages` ADD FULLTEXT search (`header_tr`,`header_en`,`content_tr`,`content_en`,`content_short_tr`,`content_short_en`,`slug`)')
  }

  down () {
    this.drop('water_pages')
  }
}

module.exports = WaterPageSchema

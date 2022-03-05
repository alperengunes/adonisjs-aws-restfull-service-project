'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ReferencesSchema extends Schema {
  up () {
    this.create('references', (table) => {
      table.increments()
      table.integer('place')
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.text('content_short_tr').notNullable()
      table.text('content_short_en')
      table.string('image_1').notNullable()
      table.string('image_2').notNullable()
      table.string('image_3').notNullable()
      table.string('slug').notNullable()
      table.text('one_box_tr').notNullable()
      table.text('one_box_en')
      table.text('two_box_tr').notNullable()
      table.text('two_box_en')
      table.text('three_box_tr').notNullable()
      table.text('three_box_en')
      table.text('four_box_tr').notNullable()
      table.text('four_box_en')
      table.timestamps()
    })
    this.raw('ALTER TABLE `references` ADD FULLTEXT search (`header_tr`,`header_en`,`content_short_tr`,`content_short_en`,`slug`)')
  }

  down () {
    this.drop('references')
  }
}

module.exports = ReferencesSchema

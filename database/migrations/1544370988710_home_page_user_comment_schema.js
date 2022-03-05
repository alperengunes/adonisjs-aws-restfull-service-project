'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HomePageUserCommentSchema extends Schema {
  up () {
    this.create('home_page_user_comments', (table) => {
      table.increments()
      table.integer('place').notNullable()
      table.string('name').notNullable()
      table.text('content_tr').notNullable()
      table.text('content_en')
      table.string('image').notNullable()
      table.timestamps()
    })
    this.raw('ALTER TABLE home_page_user_comments ADD FULLTEXT search (`name`,`content_tr`,`content_en`)')
  }

  down () {
    this.drop('home_page_user_comments')
  }
}

module.exports = HomePageUserCommentSchema

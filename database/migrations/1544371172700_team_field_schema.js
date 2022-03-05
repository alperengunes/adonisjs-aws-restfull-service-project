'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeamFieldSchema extends Schema {
  up () {
    this.create('team_fields', (table) => {
      table.increments()
      table.string('header_tr').notNullable()
      table.string('header_en')
      table.text('content_tr').notNullable()
      table.text('content_en')
      table.timestamps()
    })
  }

  down () {
    this.drop('team_fields')
  }
}

module.exports = TeamFieldSchema

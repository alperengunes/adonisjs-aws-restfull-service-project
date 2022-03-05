'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TeamSchema extends Schema {
  up () {
    this.create('teams', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.string('jobs_tr').notNullable()
      table.string('jobs_en')
      table.string('image')
      table.timestamps()
    })
    this.raw('ALTER TABLE teams ADD FULLTEXT search (`name`,`jobs_tr`,`jobs_en`)')
  }

  down () {
    this.drop('teams')
  }
}

module.exports = TeamSchema

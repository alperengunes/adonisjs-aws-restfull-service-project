'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ContactFormSchema extends Schema {
  up () {
    this.create('contact_forms', (table) => {
      table.increments()
      table.string('namesurname')
      table.string('email')
      table.string('telephone')
      table.text('message')
      table.timestamps()
    })
    this.raw('ALTER TABLE contact_forms ADD FULLTEXT search (`namesurname`,`email`,`telephone`,`message`)')
  }

  down () {
    this.drop('contact_forms')
  }
}

module.exports = ContactFormSchema

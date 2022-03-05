'use strict'
const ContactForm = use('App/Models/ContactForm')
const querymaker = use('App/Helpers/QueryMaker')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contactforms
 */
class ContactFormController {
  /**
   * Show a list of all contactforms.
   * GET contactforms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const options={
      DB:'contact_forms',
      key:request.get('key').key,
      page:request.get('page').page,
      match:'namesurname,email,telephone,message',
      limit:request.get('limit').limit,
      pagination:request.get('pagination').pagination,
      sort:request.get('sort').sort,
      sortby:request.get('sortby').sortby
    }
    return await querymaker.maker(options)
  }

  async show ({ params, request, response, view }) {
    const contactform = await ContactForm.findOrFail(params.id)
    return response.send(contactform)
  }

  async destroy ({ params, request, response }) {
    const contactform = await ContactForm.findOrFail(params.id)
    await contactform.delete()
    return contactform
  }
}

module.exports = ContactFormController

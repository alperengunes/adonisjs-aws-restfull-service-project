'use strict'
const ContactField = use('App/Models/ContactField')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contactfields
 */
class ContactFieldController {
  /**
   * Show a list of all contactfields.
   * GET contactfields
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const contactfield = await ContactField.first()
    return response.send(contactfield)
  }

  /**
   * Update contactfield details.
   * PUT or PATCH contactfields/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const contactfield = await ContactField.first()
    const rules = {
      header_tr:'required',
    }
    const messages = {
      'header_tr.required':'Başlığı Girin!'
    }
    const validator = await validate(request.all(),rules,messages)
    if(validator.fails())
    {
      return response.status(422).json(validation.messages())
    }
    contactfield.merge(request.all())
    await contactfield.save()
    return response.send(contactfield)
  }
}

module.exports = ContactFieldController

'use strict'
const ServicesField = use('App/Models/ServicesField')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with servicesfields
 */
class ServicesFieldController {
  /**
   * Show a list of all servicesfields.
   * GET servicesfields
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const servicesfield = await ServicesField.first()
    return response.send(servicesfield)
  }

  /**
   * Update servicesfield details.
   * PUT or PATCH servicesfields/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const servicesfield = await ServicesField.first()
    const rules = {
      header_tr:'required'
    }
    const messages = {
      'header_tr.required':'Başlığı Girin!'
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    await servicesfield.merge(request.all())
    await servicesfield.save()
    return response.send(servicesfield)
  }
}

module.exports = ServicesFieldController

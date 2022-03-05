'use strict'
const StoneEventField = use('App/Models/StoneEventField')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with stoneeventfields
 */
class StoneEventFieldController {
  /**
   * Show a list of all stoneeventfields.
   * GET stoneeventfields
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const stoneeventfield = await StoneEventField.first()
    return response.send(stoneeventfield)
  }

  /**
   * Update stoneeventfield details.
   * PUT or PATCH stoneeventfields/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const stoneeventfield = await StoneEventField.first()
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
    await stoneeventfield.merge(request.all())
    await stoneeventfield.save()
    return response.send(stoneeventfield)
  }
}

module.exports = StoneEventFieldController

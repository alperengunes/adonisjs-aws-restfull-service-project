'use strict'
const HeatingAndWaterEventField = use('App/Models/HeatingAndWaterEventField')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with heatingandwatereventfields
 */
class HeatingAndWaterEventFieldController {
  /**
   * Show a list of all heatingandwatereventfields.
   * GET heatingandwatereventfields
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const heatingandwatereventfield = await HeatingAndWaterEventField.first()
    return response.send(heatingandwatereventfield)
  }

  /**
   * Update heatingandwatereventfield details.
   * PUT or PATCH heatingandwatereventfields/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const heatingandwatereventfield = await HeatingAndWaterEventField.first()
    const rules = {
      header_tr:'required',
    }
    const messages = {
      'header_tr.required':'Başlığı Girin!',
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    heatingandwatereventfield.merge(request.all())
    await heatingandwatereventfield.save()
    return response.send(heatingandwatereventfield)
  }
}

module.exports = HeatingAndWaterEventFieldController

'use strict'
const WhySliderField = use('App/Models/WhySliderField')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with whysliderfields
 */
class WhySliderFieldController {
  /**
   * Show a list of all whysliderfields.
   * GET whysliderfields
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const whysliderfield = await WhySliderField.first()
    return response.send(whysliderfield)
  }

  /**
   * Update whysliderfield details.
   * PUT or PATCH whysliderfields/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const whysliderfield = await WhySliderField.first()
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
    await whysliderfield.merge(request.all())
    await whysliderfield.save()
    return response.send(whysliderfield)
  }
}

module.exports = WhySliderFieldController

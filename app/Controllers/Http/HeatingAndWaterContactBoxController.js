'use strict'
const HeatingAndWaterContactBox = use('App/Models/HeatingAndWaterContactBox')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with heatingandwatercontactboxes
 */
class HeatingAndWaterContactBoxController {
  /**
   * Show a list of all heatingandwatercontactboxes.
   * GET heatingandwatercontactboxes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const heatingandwatercontactbox = await HeatingAndWaterContactBox.first()
    return response.send(heatingandwatercontactbox)
  }

  /**
   * Update fixedcontact details.
   * PUT or PATCH fixedcontacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const heatingandwatercontactbox = await HeatingAndWaterContactBox.first()
    const rules = {
      one_header_tr:'required',
      two_header_tr:'required'
    }
    const messages = {
      'one_header_tr.required':'Ana Yazıyı Girin!',
      'two_header_tr.required':'Alt Başlığı Girin!'
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    await heatingandwatercontactbox.merge(request.all())
    await heatingandwatercontactbox.save()
    return response.send(heatingandwatercontactbox)
  }
}

module.exports = HeatingAndWaterContactBoxController

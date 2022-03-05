'use strict'
const HomePageSliderUnder = use('App/Models/HomePageSliderUnder')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with homepagesliderunders
 */
class HomePageSliderUnderController {
  /**
   * Show a list of all homepagesliderunders.
   * GET homepagesliderunders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const homepagesliderunder = await HomePageSliderUnder.first()
    return response.send(homepagesliderunder)
  }

  /**
   * Update homepagesliderunder details.
   * PUT or PATCH homepagesliderunders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const homepagesliderunder = await HomePageSliderUnder.first()
    const rules = {
      header_tr:'required',
      content_tr:'required',
    }
    const messages = {
      'header_tr.required':'Başlığı Girin!',
      'content_tr.required':'İçeriği Girin!'
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    await homepagesliderunder.merge(request.all())
    await homepagesliderunder.save()
    return response.send(homepagesliderunder)
  }
}

module.exports = HomePageSliderUnderController

'use strict'
const HomePageSprayFieldOne = use('App/Models/HomePageSprayFieldOne')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with homepagesprayfieldones
 */
class HomePageSprayFieldOneController {
  /**
   * Show a list of all homepagesprayfieldones.
   * GET homepagesprayfieldones
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const homepagesprayfieldone = await HomePageSprayFieldOne.first()
    return response.send(homepagesprayfieldone)
  }

  /**
   * Update homepagesprayfieldone details.
   * PUT or PATCH homepagesprayfieldones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const homepagesprayfieldone = await HomePageSprayFieldOne.first()
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
    await homepagesprayfieldone.merge(request.all())
    await homepagesprayfieldone.save()
    return response.send(homepagesprayfieldone)
  }
}

module.exports = HomePageSprayFieldOneController

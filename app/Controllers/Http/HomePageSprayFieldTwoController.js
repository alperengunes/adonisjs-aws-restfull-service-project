'use strict'
const HomePageSprayFieldTwo = use('App/Models/HomePageSprayFieldTwo')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with homepagesprayfieldtwos
 */
class HomePageSprayFieldTwoController {
  /**
   * Show a list of all homepagesprayfieldtwos.
   * GET homepagesprayfieldtwos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const homepagesprayfieldtwo = await HomePageSprayFieldTwo.first()
    return response.send(homepagesprayfieldtwo)
  }

  /**
   * Update homepagesprayfieldtwo details.
   * PUT or PATCH homepagesprayfieldtwos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const homepagesprayfieldtwo = await HomePageSprayFieldTwo.first()
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
    await homepagesprayfieldtwo.merge(request.all())
    await homepagesprayfieldtwo.save()
    return response.send(homepagesprayfieldtwo)
  }
}

module.exports = HomePageSprayFieldTwoController

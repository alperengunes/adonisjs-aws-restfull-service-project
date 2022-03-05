'use strict'
const HomePageFieldService = use('App/Models/HomePageFieldService')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with homepagefieldservices
 */
class HomePageFieldServiceController {
  /**
   * Show a list of all homepagefieldservices.
   * GET homepagefieldservices
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const homepagefieldservice = await HomePageFieldService.first()
    return response.send(homepagefieldservice)
  }

  /**
   * Update homepagefieldservice details.
   * PUT or PATCH homepagefieldservices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const homepagefieldservice = await HomePageFieldService.first()
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
    await homepagefieldservice.merge(request.all())
    await homepagefieldservice.save()
    return response.send(homepagefieldservice)
  }
}

module.exports = HomePageFieldServiceController

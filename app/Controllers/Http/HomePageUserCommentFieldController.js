'use strict'
const HomePageUserCommentField = use('App/Models/HomePageUserCommentField')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with homepageusercommentfields
 */
class HomePageUserCommentFieldController {
  /**
   * Show a list of all homepageusercommentfields.
   * GET homepageusercommentfields
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const homepageusercommentfield = await HomePageUserCommentField.first()
    return response.send(homepageusercommentfield)
  }

  /**
   * Update homepageusercommentfield details.
   * PUT or PATCH homepageusercommentfields/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const homepageusercommentfield = await HomePageUserCommentField.first()
    const rules = {
      header_tr:'required'
    }
    const messages = {
      'header_tr.required':'Başlığı Girin!'
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    await homepageusercommentfield.merge(request.all())
    await homepageusercommentfield.save()
    return response.send(homepageusercommentfield)
  }
}

module.exports = HomePageUserCommentFieldController

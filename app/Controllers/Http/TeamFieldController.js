'use strict'
const TeamField = use('App/Models/TeamField')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with teamfields
 */
class TeamFieldController {
  /**
   * Show a list of all teamfields.
   * GET teamfields
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const teamfield = await TeamField.first()
    return response.send(teamfield)
  }

  /**
   * Update teamfield details.
   * PUT or PATCH teamfields/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const teamfield = await TeamField.first()
    const rules = {
      header_tr:'required',
      content_tr:'required'
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
    await teamfield.merge(request.all())
    await teamfield.save()
    return response.send(teamfield)
  }
}

module.exports = TeamFieldController

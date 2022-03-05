'use strict'
const HeatingAndWaterSidebar = use('App/Models/HeatingAndWaterSideBar')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with heatingandwatersidebars
 */
class HeatingAndWaterSidebarController {
  /**
   * Show a list of all heatingandwatersidebars.
   * GET heatingandwatersidebars
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const heatingandwatersidebar = await HeatingAndWaterSidebar.first()
    return response.send(heatingandwatersidebar)
  }

  /**
   * Update heatingandwatersidebar details.
   * PUT or PATCH heatingandwatersidebars/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const heatingandwatersidebar = await HeatingAndWaterSidebar.first()
    const rules = {
      water_header_tr:'required',
      heating_header_tr:'required',
    }
    const messages = {
      'water_header_tr.required':'Su Başlığını Girin!',
      'heating_header_tr.required':'Isı Başlığını Girin!',
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    await heatingandwatersidebar.merge(request.all())
    await heatingandwatersidebar.save()
    return response.send(heatingandwatersidebar)
  }
}

module.exports = HeatingAndWaterSidebarController

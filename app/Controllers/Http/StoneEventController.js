'use strict'
const StoneEvent = use('App/Models/StoneEvent')
const {validate} = use('Validator')
const querymaker = use('App/Helpers/QueryMaker')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with stoneevents
 */
class StoneEventController {
  /**
   * Show a list of all stoneevents.
   * GET stoneevents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const options={
      DB:'stone_events',
      key:request.get('key').key,
      page:request.get('page').page,
      match:'header_tr,header_en',
      limit:request.get('limit').limit,
      pagination:request.get('pagination').pagination,
      sort:request.get('sort').sort,
      sortby:request.get('sortby').sortby
    }
    return await querymaker.maker(options)
  }

  /**
   * Create/save a new stoneevent.
   * POST stoneevents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const stoneevent = new StoneEvent()
    const rules = {
      year:'required|number',
      header_tr:'required'
    }
    const messages = {
      'year.required':'Yılı Girin!',
      'year.number':'Yılı Numara Biçiminde Girin!',
      'header_tr.required':'Başlığı Girin!'
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    await stoneevent.merge(request.all())
    await stoneevent.save()
    return response.send(stoneevent)
  }

  /**
   * Display a single stoneevent.
   * GET stoneevents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const stoneevent = await StoneEvent.findOrFail(params.id)
    return response.send(stoneevent)
  }

  /**
   * Update stoneevent details.
   * PUT or PATCH stoneevents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const stoneevent = await StoneEvent.findOrFail(params.id)
    const rules = {
      year:'required|number',
      header_tr:'required'
    }
    const messages = {
      'year.required':'Yılı Girin!',
      'year.number':'Yılı Numara Biçiminde Girin!',
      'header_tr.required':'Başlığı Girin!'
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    await stoneevent.merge(request.all())
    await stoneevent.save()
    return response.send(stoneevent)
  }

  /**
   * Delete a stoneevent with id.
   * DELETE stoneevents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const stoneevent = await StoneEvent.findOrFail(params.id)
    await stoneevent.delete()
    return response.send(stoneevent)
  }
}

module.exports = StoneEventController

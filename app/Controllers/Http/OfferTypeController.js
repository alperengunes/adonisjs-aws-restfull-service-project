'use strict'
const OfferType = use('App/Models/OfferType')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with offertypes
 */
class OfferTypeController {
  /**
   * Show a list of all offertypes.
   * GET offertypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    if(request.get('id').id!==undefined)
    {
      const id = request.get('id').id
      const offertype = await OfferType.query().where('offerapplication_id',id).orderBy('created_at','desc').fetch()
      response.send(offertype)
    }
    else
    {
      return response.status(404).json('Not Found!')
    }
  }

  /**
   * Create/save a new offertype.
   * POST offertypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const offertype = new OfferType()
    const rules = {
      offerapplication_id:'required',
      header_tr:'required',
    }
    const messages = {
      'offerapplication_id.required':'Uygulama İd Girin!',
      'header_tr.required':'Başlığı Girin!',
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    await offertype.merge(request.all())
    await offertype.save()
    return response.send(offertype)
  }

  /**
   * Display a single offertype.
   * GET offertypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const offertype = await OfferType.findOrFail(params.id)
    return response.send(offertype)
  }

  /**
   * Update offertype details.
   * PUT or PATCH offertypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const offertype = await OfferType.findOrFail(params.id)
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
    await offertype.merge(request.all())
    await offertype.save()
    return response.send(offertype)
  }

  /**
   * Delete a offertype with id.
   * DELETE offertypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const offertype = await OfferType.findOrFail(params.id)
    await offertype.delete()
    return response.send(offertype)
  }
}

module.exports = OfferTypeController

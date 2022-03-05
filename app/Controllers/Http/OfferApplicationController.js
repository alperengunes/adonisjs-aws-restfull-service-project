'use strict'
const querymaker = use('App/Helpers/QueryMaker')
const {validate} = use('Validator')
const OfferApplication = use('App/Models/OfferApplication')
const OfferType = use('App/Models/OfferType')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with offerapplications
 */
class OfferApplicationController {
  /**
   * Show a list of all offerapplications.
   * GET offerapplications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const options={
      DB:'offer_applications',
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
   * Create/save a new offerapplication.
   * POST offerapplications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const offerapplication = new OfferApplication()
    const rules = {
      header_tr:'required'
    }
    const messages = {
      'header_tr':'Başlığı Girin!'
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    await offerapplication.merge(request.all())
    await offerapplication.save()
    return response.send(offerapplication)
  }

  /**
   * Display a single offerapplication.
   * GET offerapplications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const offerapplication = await OfferApplication.findOrFail(params.id)
    return response.send(offerapplication)
  }

  /**
   * Update offerapplication details.
   * PUT or PATCH offerapplications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const offerapplication = await OfferApplication.findOrFail(params.id)
    const rules = {
      header_tr:'required'
    }
    const messages = {
      'header_tr':'Başlığı Girin!'
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    await offerapplication.merge(request.all())
    await offerapplication.save()
    return response.send(offerapplication)
  }

  /**
   * Delete a offerapplication with id.
   * DELETE offerapplications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const offerapplication = await OfferApplication.findOrFail(params.id)
    await OfferType.query().where('offerapplication_id',params.id).delete()
    await offerapplication.delete()
    return response.send(offerapplication)
  }
}

module.exports = OfferApplicationController

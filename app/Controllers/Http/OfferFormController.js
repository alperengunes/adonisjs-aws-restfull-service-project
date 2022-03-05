'use strict'
const querymaker = use('App/Helpers/QueryMaker')
const OfferForm = use('App/Models/OfferForm')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with offerforms
 */
class OfferFormController {
  /**
   * Show a list of all offerforms.
   * GET offerforms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const options={
      DB:'offer_forms',
      key:request.get('key').key,
      page:request.get('page').page,
      match:'namesurname,companyname,mail,telephone,message,offerapplication,offertype',
      limit:request.get('limit').limit,
      pagination:request.get('pagination').pagination,
      sort:request.get('sort').sort,
      sortby:request.get('sortby').sortby
    }
    return await querymaker.maker(options)
  }

  async store({request,response})
  {
    const offerform = await OfferForm.create(request.all())
    return offerform
  }

  async update ({ params, request, response }) {
    const offerform = await OfferForm.findOrFail(params.id)
    offerform.merge(request.all())
    offerform.save()
    return response.send(offerform)
  }

  /**
   * Display a single offerform.
   * GET offerforms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const offerform = await OfferForm.findOrFail(params.id)
    return response.send(offerform)
  }

  /**
   * Delete a offerform with id.
   * DELETE offerforms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const offerform = await OfferForm.findOrFail(params.id)
    await offerform.delete()
    return response.send(offerform)
  }
}

module.exports = OfferFormController

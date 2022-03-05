'use strict'
const FixedContact = use('App/Models/FixedContact')
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with fixedcontacts
 */
class FixedContactController {
  /**
   * Show a list of all fixedcontacts.
   * GET fixedcontacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const fixedcontact = await FixedContact.first()
    return response.send(fixedcontact)
  }

  /**
   * Update fixedcontact details.
   * PUT or PATCH fixedcontacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const fixedcontact = await FixedContact.first()
    const rules = {
      adress:'required',
      telephone:'required',
      telephoneshop:'required',
      mail:'required',
      days_tr:'required',
      hour:'required',
      footer_tr:'required',
      footer_content_tr:'required',
      help_header_tr:'required',
      header_fix_tr:'required',
      content_fix_tr:'required',
    }
    const messages = {
      'adress.required':'Adresi Girin!',
      'telephone.required':'Telefonu Girin!',
      'telephoneshop.required':'Dükkan Telefonunu Girin!',
      'mail.required':'Mail Girin!',
      'days_tr.required':'Günleri Türkçe Girin!',
      'hour.required':'Saat Girin!',
      'footer_tr.required':'Alt Yazı Başlığı Girin!',
      'footer_content_tr.required':'Alt Yazı İçeriği Girin!',
      'help_header_tr.required':'Üst Yardım Yazısını Girin!',
      'header_fix_tr.required':'Üst Bizden Sorulur Yazısını Girin!',
      'content_fix_tr.required':'Üst Beri Yazısını Girin!',
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    await fixedcontact.merge(request.all())
    await fixedcontact.save()
    return response.send(fixedcontact)
  }
}

module.exports = FixedContactController

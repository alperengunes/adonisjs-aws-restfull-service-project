'use strict'
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')
const HomePageWaterService = use('App/Models/HomePageWaterService')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with homepagewaterservices
 */
class HomePageWaterServiceController {
  /**
   * Show a list of all homepagewaterservices.
   * GET homepagewaterservices
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const homepagewaterservice = await HomePageWaterService.first()
    return response.send(homepagewaterservice)
  }

  /**
   * Update homepagewaterservice details.
   * PUT or PATCH homepagewaterservices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const homepagewaterservice = await HomePageWaterService.first()
    const rules = {
      main_header_tr:'required',
      header_tr:'required',
      content_tr:'required',
      features_header_tr:'required'
   }
   const messages = {
      'main_header_tr.required':'Ana Başlığı Girin!',
      'header_tr.required':'Başlığı Girin!',
      'content_tr.required':'İçeriği Girin!',
      'features_header_tr.required':'Özellikler Başlığını Girin!'
   }
   const validation = await validate(request.all(),rules,messages)
   if(validation.fails())
   {
     return response.status(422).json(validation.messages())
   }
   if(request.file('icon'))
    {
      const file = request.file('icon',{
        types:['image'],
        size:'2mb'
      })
      const options = {
        file,
        height:130,
        width:130,
        folder:'HomePageWaterService',
        type:'thumb',
        deletefile:homepagewaterservice.icon
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      homepagewaterservice.merge({icon:link})
    }
    await homepagewaterservice.merge(request.all())
    await homepagewaterservice.save()
    return response.send(homepagewaterservice)
  }
}

module.exports = HomePageWaterServiceController

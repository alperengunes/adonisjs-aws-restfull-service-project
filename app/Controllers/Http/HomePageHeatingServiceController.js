'use strict'
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')
const HomePageHeatingService = use('App/Models/HomePageHeatingService')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with homepageheatingservices
 */
class HomePageHeatingServiceController {
  /**
   * Show a list of all homepageheatingservices.
   * GET homepageheatingservices
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const homepageheatingservice = await HomePageHeatingService.first()
    return response.send(homepageheatingservice)
  }

  /**
   * Update homepageheatingservice details.
   * PUT or PATCH homepageheatingservices/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const homepageheatingservice = await HomePageHeatingService.first()
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
        folder:'HomePageHeatingService',
        type:'thumb',
        deletefile:homepageheatingservice.icon
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      homepageheatingservice.merge({icon:link})
    }
    await homepageheatingservice.merge(request.all())
    await homepageheatingservice.save()
    return response.send(homepageheatingservice)
  }
}

module.exports = HomePageHeatingServiceController

'use strict'
const WaterPageMainField = use('App/Models/WaterPageMainField')
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with waterpagemainfields
 */
class WaterPageMainFieldController {
  /**
   * Show a list of all waterpagemainfields.
   * GET waterpagemainfields
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const waterpagemainfield = await WaterPageMainField.first()
    return response.send(waterpagemainfield)
  }

  /**
   * Update waterpagemainfield details.
   * PUT or PATCH waterpagemainfields/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const waterpagemainfield = await WaterPageMainField.first()
    const rules = {
      header_tr:'required'
    }
    const messages = {
      'header_tr.required':'Başlığı Girin!'
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    if(request.file('image'))
    {
      const file = request.file('image',{
        types:['image'],
        size:'2mb'
      })
      const options = {
        file,
        height:350,
        width:1903,
        folder:'WaterPageMainField',
        type:'thumb',
        deletefile:waterpagemainfield.image
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      waterpagemainfield.merge({image:link})
    }
    await waterpagemainfield.merge(request.all())
    await waterpagemainfield.save()
    return response.send(waterpagemainfield)
  }
}

module.exports = WaterPageMainFieldController

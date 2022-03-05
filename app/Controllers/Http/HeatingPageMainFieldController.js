'use strict'
const HeatingPageMainField = use('App/Models/HeatingPageMainField')
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with heatingpagemainfields
 */
class HeatingPageMainFieldController {
  /**
   * Show a list of all heatingpagemainfields.
   * GET heatingpagemainfields
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const heatingpagemainfield = await HeatingPageMainField.first()
    return response.send(heatingpagemainfield)
  }

  /**
   * Update heatingpagemainfield details.
   * PUT or PATCH heatingpagemainfields/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const heatingpagemainfield = await HeatingPageMainField.first()
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
        folder:'HeatingPageMainField',
        type:'thumb',
        deletefile:heatingpagemainfield.image
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      heatingpagemainfield.merge({image:link})
    }
    await heatingpagemainfield.merge(request.all())
    await heatingpagemainfield.save()
    return response.send(heatingpagemainfield)
  }
}

module.exports = HeatingPageMainFieldController

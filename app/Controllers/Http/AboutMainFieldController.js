'use strict'
const AboutMainField = use('App/Models/AboutMainField')
const { validate } = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with aboutmainfields
 */
class AboutMainFieldController {
  /**
   * Show a list of all aboutmainfields.
   * GET aboutmainfields
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response }) {
    const aboutmainfield = await AboutMainField.first()
    return response.send(aboutmainfield)
  }

  /**
   * Update aboutmainfield details.
   * PUT or PATCH aboutmainfields/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const aboutmainfield = await AboutMainField.first()
    const rules = {
      header_tr: 'required',
    }
    const messages = {
      'header_tr.required': 'Başlığı Girin!',
    }
    const validation = await validate(request.all(), rules, messages)
    if (validation.fails()) {
      return response.status(422).json(validation.messages())
    }
    if(request.file('image'))
    {
    const file = request.file('image', {
      types: ['image'],
      size: '2mb'
    })
    const options={
     file,
     height:350,
     width:1903,
     folder:'AboutMainField',
     type:'thumb',
     deletefile:aboutmainfield.image
    }
    let link = await storagetraits.resize(options)
    if(link.errortype==false)
    {
      return response.status(422).json(link.message)
    }
    aboutmainfield.merge({image:link})
    }
    aboutmainfield.merge(request.all())
    await aboutmainfield.save()
    return response.send(aboutmainfield)
  }
}


module.exports = AboutMainFieldController

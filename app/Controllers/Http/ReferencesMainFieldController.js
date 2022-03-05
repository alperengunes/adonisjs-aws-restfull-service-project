'use strict'
const ReferencesMainField = use('App/Models/ReferencesMainField')
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with referencesmainfields
 */
class ReferencesMainFieldController {
  /**
   * Show a list of all referencesmainfields.
   * GET referencesmainfields
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const referencesmainfield = await ReferencesMainField.first()
    return response.send(referencesmainfield)
  }

  /**
   * Update referencesmainfield details.
   * PUT or PATCH referencesmainfields/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const referencesmainfield = await ReferencesMainField.first()
    const rules = {
      header_tr:'required',
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
        folder:'ReferencesMainField',
        type:'thumb',
        deletefile:referencesmainfield.image
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      referencesmainfield.merge({image:link})
    }
    await referencesmainfield.merge(request.all())
    await referencesmainfield.save()
    return response.send(referencesmainfield)
  }
}

module.exports = ReferencesMainFieldController

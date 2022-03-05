'use strict'
const ServicesMainField = use('App/Models/ServicesMainField')
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with servicemainfields
 */
class ServicesMainFieldController {
  /**
   * Show a list of all servicemainfields.
   * GET servicemainfields
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const servicemainfield = await ServicesMainField.first()
    return response.send(servicemainfield)
  }

  /**
   * Update servicemainfield details.
   * PUT or PATCH servicemainfields/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const servicesmainfield = await ServicesMainField.first()
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
        folder:'ServiceMainField',
        type:'thumb',
        deletefile:servicesmainfield.image
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      servicesmainfield.merge({image:link})
    }
    await servicesmainfield.merge(request.all())
    await servicesmainfield.save()
    return response.send(servicesmainfield)
  }
}

module.exports = ServicesMainFieldController

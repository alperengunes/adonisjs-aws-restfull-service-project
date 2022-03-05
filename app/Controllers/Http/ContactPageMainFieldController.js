'use strict'
const ContactPageMainField = use('App/Models/ContactPageMainField')
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contactpagemainfields
 */
class ContactPageMainFieldController {
  /**
   * Show a list of all contactpagemainfields.
   * GET contactpagemainfields
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const contactpagemainfield = await ContactPageMainField.first()
    return response.send(contactpagemainfield)
  }
  /**
   * Update contactpagemainfield details.
   * PUT or PATCH contactpagemainfields/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const contactpagemainfield  = await ContactPageMainField.first()
    const rules = {
      header_tr:'required'
    }
    const messages = {
      'header_tr.required':'Başlığı Girin!'
    }
    const validator = await validate(request.all(),rules,messages)
    if(validator.fails())
    {
      return response.status(422).json(validation.messages())
    }
    if(request.file('image'))
    {
      const file = request.file('image',{
        types: ['image'],
        size: '2mb'
      })
      const options={
        file,
        height:350,
        width:1903,
        folder:'ContactPageMainField',
        type:'thumb',
        deletefile:contactpagemainfield.image
       }
       let link = await storagetraits.resize(options)
       if(link.errortype==false)
       {
       return response.status(422).json(link.message)
       }
       contactpagemainfield.merge({image:link})
    }
    contactpagemainfield.merge(request.all())
    await contactpagemainfield.save()
    return response.send(contactpagemainfield)
  }
}

module.exports = ContactPageMainFieldController

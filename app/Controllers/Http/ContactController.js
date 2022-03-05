'use strict'
const Contact = use('App/Models/Contact')
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contacts
 */
class ContactController {
  /**
   * Show a list of all contacts.
   * GET contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const contact = await Contact.first()
    return response.send(contact)
  }

  /**
   * Update contact details.
   * PUT or PATCH contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const contact = await Contact.first()
    const rules ={
      header_tr:'required',
      content_tr:'required'
    }
    const messages={
      'header_tr.required':'Başlığı Girin!',
      'content_tr.required':'İçeriği Girin!'
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
      const options={
        file,
        height:200,
        width:200,
        folder:'Contact',
        type:'thumb',
        deletefile:contact.image,
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      contact.merge({image:link})
    }
    await contact.merge(request.all())
    await contact.save()
    return response.send(contact)
  }
}

module.exports = ContactController

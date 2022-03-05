'use strict'
const About = use('App/Models/About')
const { validate } = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with abouts
 */
class AboutController {
  /**
   * Show a list of all abouts.
   * GET abouts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response }) {
    const about = await About.first()
    return response.send(about)
  }
  /**
   * Update about details.
   * PUT or PATCH abouts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const about = await About.first()
    const rules = {
      main_header_field_tr: 'required',
      content_tr: 'required',
    }
    const messages = {
      'main_header_field_tr.required': 'Ana Başlığı Girin!',
      'content_tr.required': 'İçerik ekleyin!',
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
     height:460,
     width:650,
     folder:'About',
     type:'thumb',
     deletefile:about.image,
    }
    let link = await storagetraits.resize(options)
    if(link.errortype==false)
    {
      return response.status(422).json(link.message)
    }
    about.merge({image:link})
    }
    about.merge(request.all())
    await about.save()
    return response.send(about)
  }
}

module.exports = AboutController

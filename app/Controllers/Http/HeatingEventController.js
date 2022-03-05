'use strict'
const HeatingEvent = use('App/Models/HeatingEvent')
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')
const fileprocess = use('App/Helpers/FileProcess')
const uniquevalidationpass = use('App/Helpers/UniqueValidationPass')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with heatingevents
 */
class HeatingEventController {
  /**
   * Show a list of all heatingevents.
   * GET heatingevents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    if(request.get('id').id!==undefined)
    {
      const id = request.get('id').id
      const heatingevent = await HeatingEvent.query().where('heatingpage_id',id).orderBy('place','desc').fetch()
      response.send(heatingevent)
    }
    else
    {
      return response.status(404).json('Not Found!')
    }
  }

  /**
   * Create/save a new heatingevent.
   * POST heatingevents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const rules = {
      heatingpage_id:'required',
      place:`required`,
      header_tr:'required',
      content_tr:'required',
    }
    const messages = {
      'heatingpage_id.required':'Su Yalıtım İd Girin',
      'place.required':'Sıralamayı Girin',
      'header_tr.required':'Başlığı Girin',
      'content_tr.required':'İçeriği Girin'
    }
    const options = {
        DB:'heating_events',
        unique:request.all().place,
        uniquecolumn:'place',
        column:'heatingpage_id',
        columnvalue:request.all().heatingpage_id,
        type:'post', // post || put
    }
    const checkunique = await uniquevalidationpass.unique(options)
    if(checkunique.errortype==false)
    {
      return response.status(422).json(checkunique.message)
    }
    const validator = await validate(request.all(),rules,messages)
    if(validator.fails())
    {
      return response.status(422).json(validator.messages())
    }
    const heatingevent = new HeatingEvent()
    if(request.file('image'))
    {
      const file = request.file('image',{
        types:['image'],
        size:'2mb'
      })
      const options = {
        file,
        height:360,
        width:960,
        folder:'HeatingEvent',
        type:'thumb',
        deletefile:null
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      heatingevent.merge({image:link})
    }
    heatingevent.merge(request.all())
    await heatingevent.save()
    return response.send(heatingevent)
  }

  /**
   * Display a single heatingevent.
   * GET heatingevents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const heatingevent = await HeatingEvent.findOrFail(params.id)
    return response.send(heatingevent)
  }

  /**
   * Update heatingevent details.
   * PUT or PATCH heatingevents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const heatingevent = await HeatingEvent.findOrFail(params.id)
    const rules = {
      place:`required`,
      header_tr:'required',
      content_tr:'required',
    }
    const messages = {
      'place.required':'Sıralamayı Girin',
      'place.unique':'Sıralama Numarası Kullanılmaktadır',
      'header_tr.required':'Başlığı Girin',
      'content_tr.required':'İçeriği Girin'
    }
    const options = {
      DB:'heating_events',
      unique:request.all().place,
      uniquecolumn:'place',
      column:'heatingpage_id',
      columnvalue:heatingevent.heatingpage_id,
      type:'put',
      uniq:params.id,
      uniqcolumn:'id'
    }
    const checkunique = await uniquevalidationpass.unique(options)
    if(checkunique.errortype==false)
    {
      return response.status(422).json(checkunique.message)
    }
    const validator = await validate(request.all(),rules,messages)
    if(validator.fails())
    {
      return response.status(422).json(validator.messages())
    }
    if(request.file('image'))
    {
      const file = request.file('image',{
        types:['image'],
        size:'2mb'
      })
      const options = {
        file,
        height:360,
        width:960,
        folder:'HeatingEvent',
        type:'thumb',
        deletefile:heatingevent.image
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      heatingevent.merge({image:link})
    }
    heatingevent.merge(request.all())
    await heatingevent.save()
    return response.send(heatingevent)
  }

  /**
   * Delete a heatingevent with id.
   * DELETE heatingevents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const heatingevent = await HeatingEvent.findOrFail(params.id)
    await fileprocess.deletefile(heatingevent.image)
    await heatingevent.delete()
    return response.send(heatingevent)
  }
}

module.exports = HeatingEventController

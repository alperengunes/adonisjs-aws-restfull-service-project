'use strict'
const WaterEvent = use('App/Models/WaterEvent')
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')
const fileprocess = use('App/Helpers/FileProcess')
const uniquevalidationpass = use('App/Helpers/UniqueValidationPass')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with waterevents
 */
class WaterEventController {
  /**
   * Show a list of all waterevents.
   * GET waterevents
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
      const waterevent = await WaterEvent.query().where('waterpage_id',id).orderBy('place','desc').fetch()
      response.send(waterevent)
    }
    else
    {
      return response.status(404).json('Not Found!')
    }
  }
  /**
   * Create/save a new waterevent.
   * POST waterevents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const rules = {
      waterpage_id:'required',
      place:`required`,
      header_tr:'required',
      content_tr:'required',
    }
    const messages = {
      'waterpage_id.required':'Su Yalıtım İd Girin',
      'place.required':'Sıralamayı Girin',
      'header_tr.required':'Başlığı Girin',
      'content_tr.required':'İçeriği Girin'
    }
    const options = {
      DB:'water_events',
      unique:request.all().place,
      uniquecolumn:'place',
      column:'waterpage_id',
      columnvalue:request.all().waterpage_id,
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
    const waterevent = new WaterEvent()
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
        folder:'WaterEvent',
        type:'thumb',
        deletefile:null
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      waterevent.merge({image:link})
    }
    waterevent.merge(request.all())
    await waterevent.save()
    return response.send(waterevent)
  }

  /**
   * Display a single waterevent.
   * GET waterevents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const waterevent = await WaterEvent.findOrFail(params.id)
    return response.send(waterevent)
  }

  /**
   * Update waterevent details.
   * PUT or PATCH waterevents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const waterevent = await WaterEvent.findOrFail(params.id)
    const rules = {
      place:`required`,
      header_tr:'required',
      content_tr:'required',
    }
    const messages = {
      'place.required':'Sıralamayı Girin',
      'header_tr.required':'Başlığı Girin',
      'content_tr.required':'İçeriği Girin'
    }
    const options = {
      DB:'water_events',
      unique:request.all().place,
      uniquecolumn:'place',
      column:'waterpage_id',
      columnvalue:waterevent.waterpage_id,
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
        folder:'WaterEvent',
        type:'thumb',
        deletefile:waterevent.image
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      waterevent.merge({image:link})
    }
    waterevent.merge(request.all())
    await waterevent.save()
    return response.send(waterevent)
  }

  /**
   * Delete a waterevent with id.
   * DELETE waterevents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const waterevent = await WaterEvent.findOrFail(params.id)
    await fileprocess.deletefile(waterevent.image)
    await waterevent.delete()
    return response.send(waterevent)
  }
}

module.exports = WaterEventController

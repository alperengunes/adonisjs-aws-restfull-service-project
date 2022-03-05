'use strict'
const querymaker = use('App/Helpers/QueryMaker')
const HomePageWaterFeature = use('App/Models/HomePageWaterFeature')
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')
const fileprocess = use('App/Helpers/FileProcess')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with homepagewaterfeatures
 */
class HomePageWaterFeatureController {
  /**
   * Show a list of all homepagewaterfeatures.
   * GET homepagewaterfeatures
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const options={
      DB:'home_page_water_features',
      key:request.get('key').key,
      page:request.get('page').page,
      match:'header_tr,header_en,content_tr,content_en',
      limit:request.get('limit').limit,
      pagination:request.get('pagination').pagination,
      sort:request.get('sort').sort,
      sortby:request.get('sortby').sortby
    }
    return await querymaker.maker(options)
  }

  /**
   * Create/save a new homepagewaterfeature.
   * POST homepagewaterfeatures
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const homepagewaterfeature = new HomePageWaterFeature()
    const rules = {
       place:'required|unique:home_page_water_features',
       header_tr:'required',
       content_tr:'required'
    }
    const messages = {
       'place.required':'Sıralama Numarasını Girin!',
       'place.unique':'Sıralama Numarası Kullanılmaktadır!',
       'header_tr.required':'Başlığı Girin!',
       'content_tr.required':'İçeriği Girin!'
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    if(request.file('icon'))
    {
      const file = request.file('icon',{
        types:['image'],
        size:'2mb'
      })
      const options = {
        file,
        height:42,
        width:42,
        folder:'HomePageWaterFeature',
        type:'thumb',
        deletefile:null
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      homepagewaterfeature.merge({icon:link})
    }
    else
    {
      return response.status(422).json('İcon Girin!')
    }
    await homepagewaterfeature.merge(request.all())
    await homepagewaterfeature.save()
    return response.send(homepagewaterfeature)
  }

  /**
   * Display a single homepagewaterfeature.
   * GET homepagewaterfeatures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const homepagewaterfeature = await HomePageWaterFeature.findOrFail(params.id)
    return response.send(homepagewaterfeature)
  }

  /**
   * Update homepagewaterfeature details.
   * PUT or PATCH homepagewaterfeatures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const homepagewaterfeature = await HomePageWaterFeature.findOrFail(params.id)
    const rules = {
       place:`required|unique:home_page_water_features,place,id,${params.id}`,
       header_tr:'required',
       content_tr:'required'
    }
    const messages = {
       'place.required':'Sıralama Numarasını Girin!',
       'place.unique':'Sıralama Numarası Kullanılmaktadır!',
       'header_tr.required':'Başlığı Girin!',
       'content_tr.required':'İçeriği Girin!'
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    if(request.file('icon'))
    {
      const file = request.file('icon',{
        types:['image'],
        size:'2mb'
      })
      const options = {
        file,
        height:42,
        width:42,
        folder:'HomePageWaterFeature',
        type:'thumb',
        deletefile:homepagewaterfeature.icon
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      homepagewaterfeature.merge({icon:link})
    }
    await homepagewaterfeature.merge(request.all())
    await homepagewaterfeature.save()
    return response.send(homepagewaterfeature)
  }

  /**
   * Delete a homepagewaterfeature with id.
   * DELETE homepagewaterfeatures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const homepagewaterfeature = await HomePageWaterFeature.findOrFail(params.id)
    await fileprocess.deletefile(homepagewaterfeature.icon)
    await homepagewaterfeature.delete()
    return response.send(homepagewaterfeature)
  }
}

module.exports = HomePageWaterFeatureController

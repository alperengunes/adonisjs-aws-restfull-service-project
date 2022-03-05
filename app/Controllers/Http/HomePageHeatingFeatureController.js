'use strict'
const querymaker = use('App/Helpers/QueryMaker')
const HomePageHeatingFeature = use('App/Models/HomePageHeatingFeature')
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')
const fileprocess = use('App/Helpers/FileProcess')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with homepageheatingfeatures
 */
class HomePageHeatingFeatureController {
  /**
   * Show a list of all homepageheatingfeatures.
   * GET homepageheatingfeatures
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const options={
      DB:'home_page_heating_features',
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
   * Create/save a new homepageheatingfeature.
   * POST homepageheatingfeatures
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const homepageheatingfeature = new HomePageHeatingFeature()
    const rules = {
       place:'required|unique:home_page_heating_features',
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
        folder:'HomePageHeatingFeature',
        type:'thumb',
        deletefile:null
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      homepageheatingfeature.merge({icon:link})
    }
    else
    {
      return response.status(422).json('İcon Girin!')
    }
    await homepageheatingfeature.merge(request.all())
    await homepageheatingfeature.save()
    return response.send(homepageheatingfeature)
  }

  /**
   * Display a single homepageheatingfeature.
   * GET homepageheatingfeatures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const homepageheatingfeature = await HomePageHeatingFeature.findOrFail(params.id)
    return response.send(homepageheatingfeature);
  }

  /**
   * Update homepageheatingfeature details.
   * PUT or PATCH homepageheatingfeatures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const homepageheatingfeature = await HomePageHeatingFeature.findOrFail(params.id)
    const rules = {
       place:`required|unique:home_page_heating_features,place,id,${params.id}`,
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
        folder:'HomePageHeatingFeature',
        type:'thumb',
        deletefile:homepageheatingfeature.icon
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      homepageheatingfeature.merge({icon:link})
    }
    await homepageheatingfeature.merge(request.all())
    await homepageheatingfeature.save()
    return response.send(homepageheatingfeature)
  }

  /**
   * Delete a homepageheatingfeature with id.
   * DELETE homepageheatingfeatures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const homepageheatingfeature = await HomePageHeatingFeature.findOrFail(params.id)
    await fileprocess.deletefile(homepageheatingfeature.icon)
    await homepageheatingfeature.delete()
    return response.send(homepageheatingfeature)
  }
}

module.exports = HomePageHeatingFeatureController

'use strict'
const WaterPage = use('App/Models/WaterPage')
const WaterEvent = use('App/Models/WaterEvent')
const {validate} =use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')
const fileprocess = use('App/Helpers/FileProcess')
const querymaker = use('App/Helpers/QueryMaker')
const slugify = use('App/Helpers/Slugify')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with waterpages
 */
class WaterPageController {
  /**
   * Show a list of all waterpages.
   * GET waterpages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const options={
      DB:'water_pages',
      key:request.get('key').key,
      page:request.get('page').page,
      match:'header_tr,header_en,content_tr,content_en,content_short_tr,content_short_en,slug',
      limit:request.get('limit').limit,
      pagination:request.get('pagination').pagination,
      sort:request.get('sort').sort,
      sortby:request.get('sortby').sortby
    }
    return await querymaker.maker(options)
  }

  /**
   * Create/save a new waterpage.
   * POST waterpages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const waterpage = new WaterPage()
    const rules = {
      place:'required|unique:water_pages',
      header_tr:'required',
      content_tr:'required',
      content_short_tr:'required',
    }
    const messages = {
      "place.required":"Sıralama Girin!",
      "place.unique":"Sıralama Kullanılmaktadır!",
      "header_tr.required":"Başlığı Girin!",
      "content_tr.required":"İçeriği Girin",
      "content_short_tr.required":"Kısa Başlığı Girin!",
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    const slug = request.all().slug
    if(!slug)
    {
      const slug = await slugify.generator(request.all().header_tr,'water_pages','post')
      if(slug.errortype==false)
      {
        return response.status(422).json(error.message)
      }
      request.all().slug = slug
    }
    else
    {
      const slug = await slugify.generator(request.all().slug,'water_pages','post')
      if(slug.errortype==false)
      {
        return response.status(422).json(slug.message)
      }
      request.all().slug = slug
    }
    if(request.file('image') && request.file('image_slider'))
    {
      const file = request.file('image',{
        types:['image'],
        size:'2mb'
      })
      const file1 = request.file('image_slider',{
        types:['image'],
        size:'2mb'
      })
      const options = {
        file,
        height:400,
        width:410,
        folder:'WaterPage',
        type:'thumb',
        deletefile:null
      }
      const options1 = {
        file:file1,
        height:400,
        width:1050,
        folder:'WaterPage',
        type:'thumb',
        deletefile:null
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      let link1 = await storagetraits.resize(options1)
      if(link1.errortype==false)
      {
        return response.status(422).json(link1.message)
      }
      waterpage.merge({image:link,image_slider:link1})
    }
    else
    {
      return response.status(422).json('Resim Yükleyin!')
    }
    waterpage.merge(request.all())
    await waterpage.save()
    return response.send(waterpage)
  }

  /**
   * Display a single waterpage.
   * GET waterpages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const waterpage = await WaterPage.findOrFail(params.id)
    return response.send(waterpage)
  }

  /**
   * Update waterpage details.
   * PUT or PATCH waterpages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const waterpage = await WaterPage.findOrFail(params.id)
    const rules = {
      place:`required|unique:water_pages,place,id,${params.id}`,
      header_tr:'required',
      content_tr:'required',
      content_short_tr:'required',
    }
    const messages = {
      "place.required":"Sıralama Girin!",
      "place.unique":"Sıralama Kullanılmaktadır!",
      "header_tr.required":"Başlığı Girin!",
      "content_tr.required":"İçeriği Girin",
      "content_short_tr.required":"Kısa Başlığı Girin!",
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    const slug = request.all().slug
    if(!slug)
    {
      const slug = await slugify.generator(request.all().header_tr,'water_pages','put',params.id)
      if(slug.errortype==false)
      {
        return response.status(422).json(error.message)
      }
      request.all().slug = slug
    }
    else
    {
      const slug = await slugify.generator(request.all().slug,'water_pages','put',params.id)
      if(slug.errortype==false)
      {
        return response.status(422).json(slug.message)
      }
      request.all().slug = slug
    }
    if(request.file('image'))
    {
      const file = request.file('image',{
        types:['image'],
        size:'2mb'
      })
      const options = {
        file,
        height:400,
        width:410,
        folder:'WaterPage',
        type:'thumb',
        deletefile:waterpage.image
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      waterpage.merge({image:link})
    }
    else if(request.file('image_slider'))
    {
      const file1 = request.file('image_slider',{
        types:['image'],
        size:'2mb'
      })
      const options1 = {
        file:file1,
        height:400,
        width:1050,
        folder:'WaterPage',
        type:'thumb',
        deletefile:waterpage.image_slider
      }
      let link1 = await storagetraits.resize(options1)
      if(link1.errortype==false)
      {
        return response.status(422).json(link1.message)
      }
      waterpage.merge({image_slider:link1})
    }
    waterpage.merge(request.all())
    await waterpage.save()
    return response.send(waterpage)
  }

  /**
   * Delete a waterpage with id.
   * DELETE waterpages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const waterpage = await WaterPage.findOrFail(params.id)
    await fileprocess.deletefile(waterpage.image)
    await fileprocess.deletefile(waterpage.image_slider)
    await WaterEvent.query().where('waterpage_id',params.id).delete()
    await waterpage.delete()
    return response.send(waterpage)
  }
}

module.exports = WaterPageController

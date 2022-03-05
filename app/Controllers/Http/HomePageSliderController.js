'use strict'
const {validate} = use('Validator')
const HomePageSlider = use('App/Models/HomePageSlider')
const querymaker = use('App/Helpers/QueryMaker')
const storagetraits = use('App/Helpers/StorageTraits')
const fileprocess = use('App/Helpers/FileProcess')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with homepagesliders
 */
class HomePageSliderController {
  /**
   * Show a list of all homepagesliders.
   * GET homepagesliders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const options={
      DB:'home_page_sliders',
      key:request.get('key').key,
      page:request.get('page').page,
      match:'header_tr,header_en,content_tr,content_en,href',
      limit:request.get('limit').limit,
      pagination:request.get('pagination').pagination,
      sort:request.get('sort').sort,
      sortby:request.get('sortby').sortby
    }
    return await querymaker.maker(options)
  }

  /**
   * Create/save a new homepageslider.
   * POST homepagesliders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const homepageslider = new HomePageSlider()
    const rules = {
      place:'required|unique:home_page_sliders',
      header_tr:'required',
      content_tr:'required'
    }
    const messages = {
      'place.required':'Sıralama Girin!',
      'place.unique':'Sıralama Kullanılmaktadır!',
      'header_tr.required':'Başlık Girin!',
      'content_tr.required':'İçerik Girin!'
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
      const options = {
        file,
        height:740,
        width:1920,
        folder:'HomePageSlider',
        type:'thumb',
        deletefile:null
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      homepageslider.merge({image:link})
    }
    else
    {
      return response.status(422).json('Resim Girin!')
    }
    await homepageslider.merge(request.all())
    await homepageslider.save()
    return response.send(homepageslider)
  }

  /**
   * Display a single homepageslider.
   * GET homepagesliders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const homepageslider = await HomePageSlider.findOrFail(params.id)
    return response.send(homepageslider)
  }

  /**
   * Update homepageslider details.
   * PUT or PATCH homepagesliders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const homepageslider = await HomePageSlider.findOrFail(params.id)
    const rules = {
      place:`required|unique:home_page_sliders,place,id,${params.id}`,
      header_tr:'required',
      content_tr:'required'
    }
    const messages = {
      'place.required':'Sıralama Girin!',
      'place.unique':'Sıralama Kullanılmaktadır!',
      'header_tr.required':'Başlık Girin!',
      'content_tr.required':'İçerik Girin!'
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
      const options = {
        file,
        height:740,
        width:1920,
        folder:'HomePageSlider',
        type:'thumb',
        deletefile:homepageslider.image
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      homepageslider.merge({image:link})
    }
    await homepageslider.merge(request.all())
    await homepageslider.save()
    return response.send(homepageslider)
  }

  /**
   * Delete a homepageslider with id.
   * DELETE homepagesliders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const homepageslider = await HomePageSlider.findOrFail(params.id)
    await fileprocess.deletefile(homepageslider.image)
    await homepageslider.delete()
    return response.send(homepageslider)
  }
}

module.exports = HomePageSliderController

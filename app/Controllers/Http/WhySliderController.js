'use strict'
const WhySlider = use('App/Models/WhySlider')
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')
const fileprocess = use('App/Helpers/FileProcess')
const querymaker = use('App/Helpers/QueryMaker')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with whysliders
 */
class WhySliderController {
  /**
   * Show a list of all whysliders.
   * GET whysliders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const options={
      DB:'why_sliders',
      key:request.get('key').key,
      page:request.get('page').page,
      match:'content_tr,content_en',
      limit:request.get('limit').limit,
      pagination:request.get('pagination').pagination,
      sort:request.get('sort').sort,
      sortby:request.get('sortby').sortby
    }
    return await querymaker.maker(options)
  }

  /**
   * Create/save a new whyslider.
   * POST whysliders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const whyslider = new WhySlider()
    const rules = {
      content_tr:'required',
    }
    const messages = {
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
      const options = {
        file,
        height:144,
        width:144,
        folder:'WhySlider',
        type:'thumb',
        deletefile:null
      }
      let link = await storagetraits.resize(options)
      whyslider.merge({image:link})
    }
    else
    {
      return response.status(422).json('Resim Girin!')
    }
    await whyslider.merge(request.all())
    await whyslider.save()
    return response.send(whyslider)
  }

  /**
   * Display a single whyslider.
   * GET whysliders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const whyslider = await WhySlider.findOrFail(params.id)
    return response.send(whyslider)
  }

  /**
   * Update whyslider details.
   * PUT or PATCH whysliders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const whyslider = await WhySlider.findOrFail(params.id)
    const rules = {
      content_tr:'required',
    }
    const messages = {
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
      const options = {
        file,
        height:144,
        width:144,
        folder:'WhySlider',
        type:'thumb',
        deletefile:whyslider.image
      }
      let link = await storagetraits.resize(options)
      whyslider.merge({image:link})
    }
    await whyslider.merge(request.all())
    await whyslider.save()
    return response.send(whyslider)
  }

  /**
   * Delete a whyslider with id.
   * DELETE whysliders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const whyslider = await WhySlider.findOrFail(params.id)
    await fileprocess.deletefile(whyslider.image)
    await whyslider.delete()
    return response.send(whyslider)
  }
}

module.exports = WhySliderController

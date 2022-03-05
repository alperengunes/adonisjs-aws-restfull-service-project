'use strict'
const HomePageUserComment = use('App/Models/HomePageUserComment')
const {validate} = use('Validator')
const querymaker = use('App/Helpers/QueryMaker')
const storagetraits = use('App/Helpers/StorageTraits')
const fileprocess = use('App/Helpers/FileProcess')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with homepageusercomments
 */
class HomePageUserCommentController {
  /**
   * Show a list of all homepageusercomments.
   * GET homepageusercomments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const options={
      DB:'home_page_user_comments',
      key:request.get('key').key,
      page:request.get('page').page,
      match:'name,content_tr,content_en',
      limit:request.get('limit').limit,
      pagination:request.get('pagination').pagination,
      sort:request.get('sort').sort,
      sortby:request.get('sortby').sortby
    }
    return await querymaker.maker(options)
  }

  /**
   * Create/save a new homepageusercomment.
   * POST homepageusercomments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const homepageusercomment = new HomePageUserComment()
    const rules = {
      place:'required|unique:home_page_user_comments',
      name:'required',
      content_tr:'required'
    }
    const messages = {
      'place.required':'Sıralama Girin!',
      'place.unique':'Sıralama Kullanılmaktadır!',
      'name.required':'Adı Girin!',
      'content_tr.required':'İçeriği (Mesajı) Girin!'
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
        height:100,
        width:100,
        folder:'HomePageUserComment',
        type:'thumb',
        deletefile:null
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      homepageusercomment.merge({image:link})
    }
    else
    {
      return response.status(422).json('Resim Girin!')
    }
    await homepageusercomment.merge(request.all())
    await homepageusercomment.save()
    return response.send(homepageusercomment)
  }

  /**
   * Display a single homepageusercomment.
   * GET homepageusercomments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const homepageusercomment = await HomePageUserComment.findOrFail(params.id)
    return response.send(homepageusercomment)
  }

  /**
   * Update homepageusercomment details.
   * PUT or PATCH homepageusercomments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const homepageusercomment = await HomePageUserComment.findOrFail(params.id)
    const rules = {
      place:`required|unique:home_page_user_comments,place,id,${params.id}`,
      name:'required',
      content_tr:'required'
    }
    const messages = {
      'place.required':'Sıralama Girin!',
      'place.unique':'Sıralama Kullanılmaktadır!',
      'name.required':'Adı Girin!',
      'content_tr.required':'İçeriği (Mesajı) Girin!'
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
        height:100,
        width:100,
        folder:'HomePageUserComment',
        type:'thumb',
        deletefile:homepageusercomment.image
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      homepageusercomment.merge({image:link})
    }
    await homepageusercomment.merge(request.all())
    await homepageusercomment.save()
    return response.send(homepageusercomment)
  }

  /**
   * Delete a homepageusercomment with id.
   * DELETE homepageusercomments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const homepageusercomment = await HomePageUserComment.findOrFail(params.id)
    await fileprocess.deletefile(homepageusercomment.image)
    await homepageusercomment.delete()
    return response.send(homepageusercomment)
  }
}

module.exports = HomePageUserCommentController

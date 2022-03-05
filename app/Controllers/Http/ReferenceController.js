'use strict'
const Reference = use('App/Models/Reference')
const {validate} = use('Validator')
const querymaker = use('App/Helpers/QueryMaker')
const storagetraits = use('App/Helpers/StorageTraits')
const fileprocess = use('App/Helpers/FileProcess')
const slugify = use('App/Helpers/Slugify')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with references
 */
class ReferenceController {
  /**
   * Show a list of all references.
   * GET references
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const options={
      DB:'references',
      key:request.get('key').key,
      page:request.get('page').page,
      match:'header_tr,header_en,content_short_tr,content_short_en,slug',
      limit:request.get('limit').limit,
      pagination:request.get('pagination').pagination,
      sort:request.get('sort').sort,
      sortby:request.get('sortby').sortby
    }
    return await querymaker.maker(options)
  }

  /**
   * Create/save a new reference.
   * POST references
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const reference = new Reference()
    const rules = {
      place:'required|unique:references',
      header_tr:'required',
      content_short_tr:'required',
      one_box_tr:'required',
      two_box_tr:'required',
      three_box_tr:'required',
      four_box_tr:'required'
    }
    const messages = {
      'place.required':'Sıralama Girin!',
      'place.unique':'Sıralama Numarası Kullanılmaktadır!',
      'header_tr.required':'Başlık Girin!',
      'content_short_tr.required':'İçerik Kısa Girin!',
      'one_box_tr.required':'Birinci Kutuyu Girin!',
      'two_box_tr.required':'İkinci Kutuyu Girin!',
      'three_box_tr.required':'Üçüncü Kutuyu Girin!',
      'four_box_tr.required':'Dördüncü Kutuyu Girin!'
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    const slug = request.all().slug
    if(!slug)
    {
      const slug = await slugify.generator(request.all().header_tr,'references','post')
      if(slug.errortype==false)
      {
        return response.status(422).json(slug.message)
      }
      request.all().slug = slug
    }
    else
    {
      const slug = await slugify.generator(request.all().slug,'references','post')
      if(slug.errortype==false)
      {
        return response.status(422).json(slug.message)
      }
      request.all().slug = slug
    }
    if(request.file('image_1') && request.file('image_2'))
    {
       const file1 = request.file('image_1',{
         types:['image'],
         size:'2mb'
       })
       const file2 = request.file('image_2',{
        types:['image'],
        size:'2mb'
       })
       const file3 = request.file('image_3',{
        types:['image'],
        size:'2mb'
      })
       //image_1
       const options1 = {
         file:file1,
         height:277,
         width:410,
         folder:'Reference',
         type:'thumb',
         deletefile:null
       }
       const options2 = {
        file:file2,
        height:386,
        width:850,
        folder:'Reference',
        type:'thumb',
        deletefile:null
      }
      const options3 = {
        file:file3,
        height:200,
        width:200,
        folder:'Reference',
        type:'thumb',
        deletefile:null
      }
       let link1 = await storagetraits.resize(options1)
       if(link1.errortype==false)
       {
         return response.status(422).json(link1.message)
       }
       let link2 = await storagetraits.resize(options2)
       if(link2.errortype==false)
       {
        return response.status(422).json(link2.message)
       }
       let link3 = await storagetraits.resize(options3)
       if(link3.errortype==false)
       {
         return response.status(422).response(link3.message)
       }
       reference.merge({image_1:link1,image_2:link2,image_3:link3})
    }
    else
    {
      return response.status(422).json('Resimler Girilmedi!')
    }
    await reference.merge(request.all())
    await reference.save()
    return response.send(reference)
  }

  /**
   * Display a single reference.
   * GET references/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const reference = await Reference.findOrFail(params.id)
    return response.send(reference)
  }

  /**
   * Update reference details.
   * PUT or PATCH references/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const reference = await Reference.findOrFail(params.id)
    const rules = {
      place:`required|unique:references,place,id,${params.id}`,
      header_tr:'required',
      content_short_tr:'required',
      one_box_tr:'required',
      two_box_tr:'required',
      three_box_tr:'required',
      four_box_tr:'required'
    }
    const messages = {
      'place.required':'Sıralama Girin!',
      'place.unique':'Sıralama Numarası Kullanılmaktadır!',
      'header_tr.required':'Başlık Girin!',
      'content_short_tr.required':'İçerik Kısa Girin!',
      'one_box_tr.required':'Birinci Kutuyu Girin!',
      'two_box_tr.required':'İkinci Kutuyu Girin!',
      'three_box_tr.required':'Üçüncü Kutuyu Girin!',
      'four_box_tr.required':'Dördüncü Kutuyu Girin!'
    }
    const validation = await validate(request.all(),rules,messages)
    if(validation.fails())
    {
      return response.status(422).json(validation.messages())
    }
    const slug = request.all().slug
    if(!slug)
    {
      const slug = await slugify.generator(request.all().header_tr,'references','put',params.id)
      if(slug.errortype==false)
      {
        return response.status(422).json(slug.message)
      }
      request.all().slug  = slug
    }
    else
    {
      const slug = await slugify.generator(request.all().slug,'references','put',params.id)
      if(slug.errortype==false)
      {
        return response.status(422).json(slug.message)
      }
      request.all().slug  = slug
    }
    if(request.file('image_1'))
    {
       const file1 = request.file('image_1',{
         types:['image'],
         size:'2mb'
       })
       const options1 = {
         file:file1,
         height:277,
         width:410,
         folder:'Reference',
         type:'thumb',
         deletefile:reference.image_1
       }
       let link1 = await storagetraits.resize(options1)
       if(link1.errortype==false)
       {
         return response.status(422).json(link1.message)
       }
       reference.merge({image_1:link1})
    }
    if(request.file('image_2')) {
      const file2 = request.file('image_2', {
        types: ['image'],
        size: '2mb'
      })
      const options2 = {
        file:file2,
        height:386,
        width:850,
        folder:'Reference',
        type:'thumb',
        deletefile:reference.image_2
      }
      let link2 = await storagetraits.resize(options2)
      if(link2.errortype==false)
      {
        return response.status(422).json(link2.message)
      }
      reference.merge({image_2:link2})
    }
    if(request.file('image_3')) {
      const file3 = request.file('image_3', {
        types: ['image'],
        size: '2mb'
      })
      const options3 = {
        file:file3,
        height:200,
        width:200,
        folder:'Reference',
        type:'thumb',
        deletefile:reference.image_3
      }
      let link3 = await storagetraits.resize(options3)
      if(link3.errortype==false)
      {
        return response.status(422).json(link3.message)
      }
      reference.merge({image_3:link3})
    }
    await reference.merge(request.all())
    await reference.save()
    return response.send(reference)
  }

  /**
   * Delete a reference with id.
   * DELETE references/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const reference = await Reference.findOrFail(params.id)
    await fileprocess.deletefile(reference.image_1)
    await fileprocess.deletefile(reference.image_2)
    await fileprocess.deletefile(reference.image_3)
    await reference.delete()
    return response.send(reference)
  }
}

module.exports = ReferenceController

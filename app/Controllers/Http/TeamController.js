'use strict'
const Team = use('App/Models/Team')
const {validate} = use('Validator')
const storagetraits = use('App/Helpers/StorageTraits')
const querymaker = use('App/Helpers/QueryMaker')
const fileprocess = use('App/Helpers/FileProcess')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with teams
 */
class TeamController {
  /**
   * Show a list of all teams.
   * GET teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const options={
      DB:'teams',
      key:request.get('key').key,
      page:request.get('page').page,
      match:'name,jobstr,jobsen',
      limit:request.get('limit').limit,
      pagination:request.get('pagination').pagination,
      sort:request.get('sort').sort,
      sortby:request.get('sortby').sortby
    }
    return await querymaker.maker(options)
  }

  /**
   * Create/save a new team.
   * POST teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const team = new Team()
    const rules = {
      name:'required',
      jobs_tr:'required'
    }
    const messages = {
      'name.required':'Adı Girin!',
      'jobs_tr.required':'Mesleğini Girin!',
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
        height:310,
        width:305,
        folder:'Team',
        type:'thumb',
        deletefile:null
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      team.merge({image:link})
    }
    await team.merge(request.all())
    await team.save()
    return response.send(team)
  }

  /**
   * Display a single team.
   * GET teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const team = await Team.findOrFail(params.id)
    return response.send(team)
  }

  /**
   * Update team details.
   * PUT or PATCH teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const team = await Team.findOrFail(params.id)
    const rules = {
      name:'required',
      jobs_tr:'required'
    }
    const messages = {
      'name.required':'Adı Girin!',
      'jobs_tr.required':'Mesleğini Girin!',
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
        height:310,
        width:305,
        folder:'Team',
        type:'thumb',
        deletefile:team.image
      }
      let link = await storagetraits.resize(options)
      if(link.errortype==false)
      {
        return response.status(422).json(link.message)
      }
      team.merge({image:link})
    }
    await team.merge(request.all())
    await team.save()
    return response.send(team)
  }

  /**
   * Delete a team with id.
   * DELETE teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const team = await Team.findOrFail(params.id)
    await fileprocess.deletefile(team.image)
    await team.delete()
    return response.send(team)
  }
}

module.exports = TeamController

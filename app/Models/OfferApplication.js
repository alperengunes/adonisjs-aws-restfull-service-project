'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class OfferApplication extends Model {

type(){
  return this.hasMany('App/Models/OfferType')
}

}

module.exports = OfferApplication

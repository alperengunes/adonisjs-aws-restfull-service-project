'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HeatingPage extends Model {
    event(){
        return this.hasMany('App/Models/HeatingEvent','id','heatingpage_id')
    }
}

module.exports = HeatingPage

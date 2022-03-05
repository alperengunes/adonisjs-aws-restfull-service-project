'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class WaterPage extends Model {
    event(){
        return this.hasMany('App/Models/WaterEvent','id','waterpage_id')
    }
}

module.exports = WaterPage

'use strict'
const Database = use('Database')

module.exports = {
    async unique(options)
    {
        const {
         DB,
         unique, //place içi
         uniquecolumn, //place
         column, // heatingpage_id
         columnvalue, // heatingpage_id values  Place başka bir heatingpage_id de var mı yok mu 
         type, // post || put 
         uniq=null, //id
         uniqcolumn=null
        } = options
        //headerpage'de bu place'ye ait başka bir kayıt var mı
        if(type=='post')
        {
            const checkunique = await Database.table(DB).where(column,columnvalue).where(uniquecolumn,unique).count('*')
            const array = checkunique[0]
            const count = array['count(*)']
            if(count !== 0)
            {
               return {errortype:false,message:uniquecolumn+' Kullanılmaktadır!'}
            }
            else
            {
               return {errortype:true,message:'Pass Geçildi!'}
            }
        }
        else if(type=='put')
        {
            const checkunique = await Database.table(DB).where(column,columnvalue).where(uniquecolumn,unique).count('*')
            const array = checkunique[0]
            const count = array['count(*)']
            if(count !== 0)
            { 
               const checkload = await Database.table(DB).where(column,columnvalue).where(uniquecolumn,unique).where(uniqcolumn,uniq).count('*')
               const array = checkload[0]
               const count = array['count(*)']
               if(count==1)
               {
                return {errortype:true,message:'Pass Geçildi!'}
               }
               else
               {
               return {errortype:false,message:uniquecolumn+' Kullanılmaktadır!'}
               }
            }
            else
            {
               return {errortype:true,message:'Pass Geçildi!'}
            }
        }
    }
}
'use strict'
const Database = use('Database')


module.exports={
async maker(options) {
   const {
    DB=null,
    key='',
    page=1,
    match=null,
    limit=10,
    pagination='true',
    sort='created_at',
    sortby='desc'
   }=options
   if(DB==null)
   {
       return 'Veritabanı Bağlantısı Boş [QueryMaker.js]'
   }
   if(key!=='')
   {
    //console.log('Arama Çalıştırıldı')
    if(pagination=='true')
    {
        const Query = await Database.table(DB).whereRaw("MATCH (" + match + ") AGAINST ('" + key + '*' + "' IN BOOLEAN MODE)").orderBy(sort, sortby).paginate(page, limit)
        return Query
    }
    else(pagination=='false')
    {
    const Query = await Database.table(DB).whereRaw("MATCH ("+ match +") AGAINST ('"+key+'*'+"' IN BOOLEAN MODE)").orderBy(sort,sortby)
    return Query
    }
   }
   else
   {
    //console.log('Düz Liste Çalıştırıldı')
    if(pagination=='true')
    {
    const Query = await Database.table(DB).orderBy(sort,sortby).paginate(page,limit)
    return Query
    }
    else(pagination=='false')
    {
    const Query = await Database.table(DB).orderBy(sort,sortby)
    return Query
    }
   }
  }
}

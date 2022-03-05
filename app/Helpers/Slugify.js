'use strict'
const {validate} =use('Validator')

module.exports = {
    async generator(str,tablename,type,id=null)
    {
        if(type=='post')
        {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
      
        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaeeeeiiiioooouuuunc------";
      
        for (var i=0, l=from.length ; i<l ; i++)
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      
      
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // collapse whitespace and replace by -
          .replace(/-+/g, '-'); // collapse dashes
        const request = {slugify:str}  
        const rules = {
            slugify:`unique:${tablename},slug`
         }
        const messages = {
            'slugify.unique':'Kısa Bağlantınız Kullanılmaktadır!'
         }
        const validation = await validate(request,rules,messages)
        if(validation.fails())
         {
           return {errortype:false,message:'Kısayol Bağlantısı (slug) Kullanılmaktadır!'}
         }
        else
         { 
           return str
         } 
        }
        if(type=='put')
        {
        if(id==null)
        {
            return {errortype:false,message:'Put Slug İd Girin!'}
        }
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
      
        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaeeeeiiiioooouuuunc------";
      
        for (var i=0, l=from.length ; i<l ; i++)
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      
      
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // collapse whitespace and replace by -
          .replace(/-+/g, '-'); // collapse dashes
        const request = {slugify:str}  
        const rules = {
            slugify:`unique:${tablename},slug,id,${id}`
         }
        const messages = {
            'slugify.unique':'Kısa Bağlantınız Kullanılmaktadır!'
         }
        const validation = await validate(request,rules,messages)
        if(validation.fails())
         {
           return {errortype:false,message:'Kısayol Bağlantısı (slug) Kullanılmaktadır!'}
         }
        else
         { 
           return str
         } 
        }
    }
}
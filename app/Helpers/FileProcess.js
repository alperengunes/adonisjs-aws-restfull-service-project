'use strict'
const Drive = use('Drive')
const Env = use('Env')

const envfolder = Env.get('AWS_URL') + '/';

module.exports = {
    async deletefile(deletefile=null,diskType='s3')
    {
      if(deletefile!==null)
      {
        const thumb = deletefile.replace(envfolder,'')
        const original = thumb.replace('thumb','original')
        await Drive.disk(diskType).delete(thumb)
        await Drive.disk(diskType).delete(original)
      }
    }
}

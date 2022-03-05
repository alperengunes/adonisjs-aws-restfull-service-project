'use strict'
const sharp = require('sharp')
const Drive = use('Drive')
const Env = use('Env')
const Helpers = use('Helpers')

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
const envfolder = Env.get('AWS_URL') + '/';
const localfolder = 'https://service.namliyalitim.com/'


module.exports= {
  //resize modu kırpmadan dönüştürüyor.
  async resize(options, diskType = 'local') {
    const {
      file,
      height,
      width,
      folder,
      type,
      deletefile
    } = options
    if (diskType == 's3') {
      const uuid = uuidv4()
      const fileNameOriginal = folder + '/original/' + uuid + '.' + file.extname
      const fileNameThumb = folder + '/thumb/' + uuid + '.' + file.extname

      const imageName = file.clientName

      // burası daha önce o dosyadan tmp dosyasında kaldıysa temizlemek için,
      const isExistBeforeInTempFile = await Drive.exists(imageName)
      if (isExistBeforeInTempFile) {
        await Drive.delete(imageName)
      }
      // move yaptığımızda, tmp dosyasına o isimle atıyor.
      await file.move(Helpers.tmpPath())
      if (file.status == 'error') {
        return {errortype: false, message: 'Dosya Uzantısı Hatalı!'}
      }
      /*  TODO validatin ekle

      if(!image.moved) {
         console.log('Resim validation geçemediği için taşınamadı')
         return image.errors()
       } */

      // burada buffer olarak çekiyoruz
      const dataForS3 = await Drive.get(imageName)


      await Drive.disk(diskType).put(fileNameOriginal, dataForS3, {
        ACL: 'public-read',
        ContentType: 'image/jpeg'
      })
      // buffer olarak verecek bize
      const sharpedBuffer = await sharp(dataForS3).resize(width, height, {
        fit: 'cover',
      }).toBuffer();
      await Drive.disk(diskType).put(fileNameThumb, sharpedBuffer, {
        ACL: 'public-read',
        ContentType: 'image/jpeg'
      })
      await Drive.delete(imageName)
      //update methodunda delete null değil ise update file dosyasını s3'te siliyor.
      if (deletefile !== null) {
        const thumb = deletefile.replace(envfolder, '')
        const original = thumb.replace('thumb', 'original')
        await Drive.disk(diskType).delete(thumb)
        await Drive.disk(diskType).delete(original)
      }
      // burada eğer s3'te o isimde dosya varsa linki gönder.
      if (type == 'original') {
        return envfolder + fileNameOriginal
      }
      else {
        return envfolder + fileNameThumb
      }
    }
    else //local
    {
      const uuid = uuidv4()
      const fileNameOriginal = folder + '/original/' + uuid + '.' + file.extname
      let fileNameThumb = folder + '/thumb/' + uuid + '.' + file.extname

      const imageName = file.clientName

      // burası daha önce o dosyadan tmp dosyasında kaldıysa temizlemek için,
      const isExistBeforeInTempFile = await Drive.exists(imageName)
      if (isExistBeforeInTempFile) {
        await Drive.delete(imageName)
      }
      if(file.extname == "svg")
      {
        await file.move(Helpers.publicPath(folder + '/original/'),{
          name:uuid + '.' + file.extname,
          overwrite: true,
          type: 'images/svg+xml'
        })
      }
      else {
        await file.move(Helpers.publicPath(folder + '/original/'),{
          name:uuid + '.' + file.extname,
          overwrite: true,
        })
      }

      if (file.status == 'error') {
        return {errortype: false, message: 'Dosya Uzantısı Hatalı!'}
      }
      const dataForLocal = await Drive.get(fileNameOriginal)

      // buffer olarak verecek bize
      const sharpedBuffer = await sharp(dataForLocal).resize(width, height, {
        fit: 'cover',
      }).toBuffer();

      if(file.extname == 'svg') {
        fileNameThumb = fileNameOriginal
      }
      else
      {
        await Drive.put(fileNameThumb, sharpedBuffer)
      }

      if (deletefile !== null) {
        const thumb = deletefile.replace(localfolder,'')
        const original = thumb.replace('thumb', 'original')
        await Drive.delete(thumb)
        await Drive.delete(original)
      }

      if (type == 'original') {
        return localfolder + fileNameOriginal
      }
      else {
        return localfolder + fileNameThumb
      }
    }
  }
}


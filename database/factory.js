'use strict'
/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

//AboutSeeder
Factory.blueprint('App/Models/About', (faker) => {
   return {
     main_header_field_tr: faker.string(),
     main_header_field_en: faker.string(),
     content_tr: faker.string(),
     content_en: faker.string(),
     image: faker.string()
   }
})

Factory.blueprint('App/Models/AboutMainField', (faker) => {
  return {
    header_tr: faker.string(),
    header_en: faker.string(),
    image: faker.string()
  }
})

Factory.blueprint('App/Models/Contact', (faker) => {
  return {
    header_tr: faker.string(),
    header_en: faker.string(),
    content_tr: faker.string(),
    content_en: faker.string(),
    image: faker.string()
  }
})

Factory.blueprint('App/Models/ContactField', (faker) => {
  return {
    header_tr: faker.string(),
    header_en: faker.string(),
  }
})

Factory.blueprint('App/Models/ContactPageMainField', (faker) => {
  return {
    header_tr: faker.string(),
    header_en: faker.string(),
    image: faker.string(),
  }
})

Factory.blueprint('App/Models/FixedContact', (faker) => {
  return {
    adress:faker.string(),
    telephone:faker.string(),
    mail:faker.string(),
    days_tr:faker.string(),
    days_en:faker.string(),
    hour:faker.string(),
    footer_tr:faker.string(),
    footer_en:faker.string(),
    footer_content_tr:faker.string(),
    footer_content_en:faker.string(),
    facebook_url:faker.string(),
    twitter_url:faker.string(),
    instagram_url:faker.string(),
    whatsapp_url:faker.string(),
    help_header_tr:faker.string(),
    help_header_en:faker.string(),
    header_fix_tr:faker.string(),
    header_fix_en:faker.string(),
    content_fix_tr:faker.string(),
    content_fix_en:faker.string(),
    googlemaps_url:faker.string(),
  }
})

Factory.blueprint('App/Models/HeatingAndWaterContactBox', (faker) => {
  return {
    one_header_tr:faker.string(),
    two_header_tr:faker.string()
  }
})

Factory.blueprint('App/Models/HeatingAndWaterEventField', (faker) => {
  return {
    header_tr: faker.string(),
    header_en: faker.string(),
  }
})

Factory.blueprint('App/Models/HomePageFieldService', (faker) => {
  return {
    header_tr: faker.string(),
    header_en: faker.string(),
  }
})

Factory.blueprint('App/Models/HomePageHeatingService', (faker) => {
  return {
    main_header_tr:faker.string(),
    main_header_en:faker.string(),
    header_tr:faker.string(),
    header_en:faker.string(),
    content_tr:faker.string(),
    content_en:faker.string(),
    features_header_tr:faker.string(),
    features_header_en:faker.string(),
    icon:faker.string(),
  }
})


Factory.blueprint('App/Models/HomePageSliderUnder', (faker) => {
  return {
    header_tr:faker.string(),
    header_en:faker.string(),
    content_tr:faker.string(),
    content_en:faker.string(),
    href:faker.string()
  }
})

Factory.blueprint('App/Models/HomePageSprayFieldOne', (faker) => {
  return {
    header_tr:faker.string(),
    header_en:faker.string(),
  }
})

Factory.blueprint('App/Models/HomePageSprayFieldTwo', (faker) => {
  return {
    header_tr:faker.string(),
    header_en:faker.string(),
  }
})

Factory.blueprint('App/Models/HomePageUserCommentField', (faker) => {
  return {
    header_tr:faker.string(),
    header_en:faker.string(),
  }
})

Factory.blueprint('App/Models/ServicesMainField', async (faker) => {
  return {
    header_tr: 'Hizmetlerimiz',
    header_en:'Hizmetlerimiz',
    image: 'http://image'
  }
})

Factory.blueprint('App/Models/ServicesField', async (faker) => {
  return {
    header_tr: 'Hizmetlerimiz',
    header_en:'Hizmetlerimiz',
  }
})


Factory.blueprint('App/Models/HomePageWaterService', (faker) => {
  return {
    main_header_tr:faker.string(),
    main_header_en:faker.string(),
    header_tr:faker.string(),
    header_en:faker.string(),
    content_tr:faker.string(),
    content_en:faker.string(),
    features_header_tr:faker.string(),
    features_header_en:faker.string(),
    icon:faker.string(),
  }
})

Factory.blueprint('App/Models/ReferencesMainField', (faker) => {
  return {
    header_tr:faker.string(),
    header_en:faker.string(),
    image:faker.string()
  }
})

Factory.blueprint('App/Models/StoneEventField', (faker) => {
  return {
    header_tr:faker.string(),
    header_en:faker.string(),
  }
})

Factory.blueprint('App/Models/TeamField', (faker) => {
  return {
    header_tr:faker.string(),
    header_en:faker.string(),
    content_tr:faker.string(),
    content_en:faker.string(),
  }
})

Factory.blueprint('App/Models/WaterPageMainField', (faker) => {
  return {
    header_tr:faker.string(),
    header_en:faker.string(),
    image:faker.string()
  }
})

Factory.blueprint('App/Models/HeatingAndWaterSideBar', (faker) => {
  return {
    water_header_tr:'Su Yalıtım Uygulamaları',
    water_header_en:'Water İsolation Applications',
    heating_header_tr:'Isı Yalıtım Uygulamaları',
    heating_header_en:'Heating İsolation Applications'
  }
})

Factory.blueprint('App/Models/HeatingPageMainField', (faker) => {
  return {
    header_tr:faker.string(),
    header_en:faker.string(),
    image:faker.string(),
  }
})

Factory.blueprint('App/Models/WhySliderField', (faker) => {
  return {
    header_tr:faker.string(),
    header_en:faker.string(),
  }
})


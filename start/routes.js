'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/',({view}) => {
  return view.render('welcome')
})
Route.group(()=> {
  Route.resource('about', 'AboutController');
  Route.resource('aboutmainfield','AboutMainFieldController');
  Route.resource('contact','ContactController');
  Route.resource('contactfield','ContactFieldController');
  Route.resource('contactform','ContactFormController'); //İletişim Form Postu
  Route.resource('contactpagemainfield','ContactPageMainFieldController');
  Route.resource('fixedcontact','FixedContactController');
  Route.resource('heatingandwatercontactbox','HeatingAndWaterContactBoxController');
  Route.resource('heatingandwatereventfield','HeatingAndWaterEventFieldController');
  Route.resource('heatingevent','HeatingEventController');
  Route.resource('heatingpage','HeatingPageController');
  Route.resource('heatingpagemainfield','HeatingPageMainFieldController');
  Route.resource('homepagefieldservice','HomePageFieldServiceController');
  Route.resource('homepageheatingfeature','HomePageHeatingFeatureController');
  Route.resource('homepageheatingservice','HomePageHeatingServiceController');
  Route.resource('homepageslider','HomePageSliderController');
  Route.resource('homepagesliderunder','HomePageSliderUnderController');
  Route.resource('homepagesprayfieldone','HomePageSprayFieldOneController');
  Route.resource('homepagesprayfieldtwo','HomePageSprayFieldTwoController');
  Route.resource('homepageusercomment','HomePageUserCommentController');
  Route.resource('homepageusercommentfield','HomePageUserCommentFieldController');
  Route.resource('homepagewaterfeature','HomePageWaterFeatureController');
  Route.resource('homepagewaterservice','HomePageWaterServiceController');
  Route.resource('heatingandwatersidebar','HeatingAndWaterSidebarController');
  Route.resource('offerapplication','OfferApplicationController');
  Route.resource('offerform','OfferFormController');
  Route.resource('offertype','OfferTypeController');
  Route.resource('reference','ReferenceController');
  Route.resource('referencesmainfield','ReferencesMainFieldController');
  Route.resource('stoneevent','StoneEventController');
  Route.resource('stoneeventfield','StoneEventFieldController');
  Route.resource('team','TeamController');
  Route.resource('teamfield','TeamFieldController');
  Route.resource('waterevent','WaterEventController');
  Route.resource('waterpage','WaterPageController');
  Route.resource('waterpagemainfield','WaterPageMainFieldController');
  Route.resource('whyslider','WhySliderController');
  Route.resource('whysliderfield','WhySliderFieldController');
  Route.resource('servicesmainfield','ServicesMainFieldController')
  Route.resource('servicesfield','ServicesFieldController')
  Route.get('statics','WebController.statics')
  Route.get('me','UserController.me')
}).prefix('api').middleware('auth')

Route.group(()=> {
   Route.get('fixed','WebController.fixed')
   Route.get('homepage','WebController.homepage')
   Route.get('about','WebController.about')
   Route.get('services/:type?/:slug?','WebController.services')
   Route.get('references/:slug?','WebController.references')
   Route.get('contact','WebController.contact')
   Route.get('offertype/:id?','WebController.offertype')
   Route.get('offerapplication/:id?','WebController.offerapplication')
   Route.post('offerform','WebController.offerform')
   Route.post('contactform','WebController.contactform')
}).prefix('web')

Route.post('login', 'UserController.login').prefix('api')

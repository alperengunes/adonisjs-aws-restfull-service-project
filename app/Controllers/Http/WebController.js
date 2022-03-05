'use strict'
const FixedContact = use('App/Models/FixedContact')
const HomePageSlider = use('App/Models/HomePageSlider')
const HomePageSliderUnder = use('App/Models/HomePageSliderUnder')
const HomePageFieldService = use('App/Models/HomePageFieldService')
const HomePageHeatingService = use('App/Models/HomePageHeatingService')
const HomePageWaterService = use('App/Models/HomePageWaterService')
const HomePageHeatingFeature = use('App/Models/HomePageHeatingFeature')
const HomePageWaterFeature = use('App/Models/HomePageWaterFeature')
const HomePageSprayFieldOne = use('App/Models/HomePageSprayFieldOne')
const HomePageSprayFieldTwo = use('App/Models/HomePageSprayFieldTwo')
const HeatingPage = use('App/Models/HeatingPage')
const WaterPage = use('App/Models/WaterPage')
const HomePageUserCommentField = use('App/Models/HomePageUserCommentField')
const HomePageUserComment = use('App/Models/HomePageUserComment')
const AboutMainField = use('App/Models/AboutMainField')
const About = use('App/Models/About')
const WhySliderField = use('App/Models/WhySliderField')
const WhySlider = use('App/Models/WhySlider')
const StoneEventField = use('App/Models/StoneEventField')
const StoneEvent = use('App/Models/StoneEvent')
const TeamField = use('App/Models/TeamField')
const Team = use('App/Models/Team')
const ServiceField = use('App/Models/ServicesField')
const ServiceMainField = use('App/Models/ServicesMainField')
const HeatingPageMainField = use('App/Models/HeatingPageMainField')
const WaterPageMainField = use('App/Models/WaterPageMainField')
const HeatingAndWaterContactBox = use('App/Models/HeatingAndWaterContactBox')
const HeatingAndWaterEventField = use('App/Models/HeatingAndWaterEventField')
const HeatingEvent = use('App/Models/HeatingEvent')
const WaterEvent = use('App/Models/WaterEvent')
const ReferencesMainField = use('App/Models/ReferencesMainField')
const Reference = use('App/Models/Reference')
const Contact = use('App/Models/Contact')
const ContactPageMainField = use('App/Models/ContactPageMainField')
const ContactField = use('App/Models/ContactField')
const OfferApplication = use('App/Models/OfferApplication')
const OfferForm = use('App/Models/OfferForm')
const {validate} = use('Validator')
const ContactForm = use('App/Models/ContactForm')
const HeatingAndWaterSidebar = use('App/Models/HeatingAndWaterSideBar')
const OfferType = use('App/Models/OfferType')

class WebController {
    async fixed({response}){
       const fixedcontact = await FixedContact.first()
       const watericon = await HomePageWaterService.query().select('icon').fetch()
       const heatingicon = await HomePageHeatingService.query().select('icon').fetch()
       const watericonjson = watericon.toJSON()[0]
       const heatingiconjson = heatingicon.toJSON()[0]
       fixedcontact.watericon = watericonjson.icon
       fixedcontact.heatingicon = heatingiconjson.icon
       return response.send(fixedcontact)
    }

    async homepage({response})
    {
      const homepageslider = await HomePageSlider.query().orderBy('place','desc').fetch()
      const homepagesliderunder = await HomePageSliderUnder.first()
      const homepagefieldservice = await HomePageFieldService.first()
      const homepagewaterservice = await HomePageWaterService.first()
      const homepageheatingservice = await HomePageHeatingService.first()
      const homepageheatingfeature = await HomePageHeatingFeature.query().orderBy('place','desc').fetch()
      const homepagewaterfeature = await HomePageWaterFeature.query().orderBy('place','desc').fetch()
      const homepagesprayfieldone = await HomePageSprayFieldOne.first()
      const heatingpage = await HeatingPage.query().orderBy('place','desc').fetch()
      const homepagesprayfieldtwo = await HomePageSprayFieldTwo.first()
      const waterpage = await WaterPage.query().orderBy('place','desc').fetch()
      const usercommentsfield = await HomePageUserCommentField.first()
      const usercomments = await HomePageUserComment.query().orderBy('place','desc').fetch()
      const payloads = {
        homepageslider:homepageslider,
        homepagesliderunder:homepagesliderunder,
        homepagefieldservice:homepagefieldservice,
        homepagewaterservice:homepagewaterservice,
        homepageheatingservice:homepageheatingservice,
        homepageheatingfeature:homepageheatingfeature,
        homepagewaterfeature:homepagewaterfeature,
        homepagesprayfieldone:homepagesprayfieldone,
        heatingpage:heatingpage,
        homepagesprayfieldtwo:homepagesprayfieldtwo,
        waterpage:waterpage,
        usercommentsfield:usercommentsfield,
        usercomments:usercomments
       }
      return response.send(payloads)
    }

    async about({response})
    {
       const aboutmainfield = await AboutMainField.first()
       const about = await About.first()
       const whysliderfield = await WhySliderField.first()
       const whyslider = await WhySlider.all()
       const stoneeventfield = await StoneEventField.first()
       const stoneevent = await StoneEvent.query().orderBy('year','desc').fetch()
       const teamfield = await TeamField.first()
       const team = await Team.all()
       const payloads = {
           aboutmainfield:aboutmainfield,
           about:about,
           whysliderfield:whysliderfield,
           whyslider:whyslider,
           stoneeventfield:stoneeventfield,
           stoneevent:stoneevent,
           teamfield:teamfield,
           team:team,
       }
       return response.send(payloads)
    }

    async services({params,response})
    {
        if(!params.type)
        {
            const servicemainfield = await ServiceMainField.first()
            const servicefield = await ServiceField.first()
            const homepageheatingservice = await HomePageHeatingService.first()
            const homepagewaterservice = await HomePageWaterService.first()
            const homepageheatingfeature = await HomePageHeatingFeature.query().orderBy('place','desc').fetch()
            const homepagewaterfeature = await HomePageWaterFeature.query().orderBy('place','desc').fetch()
            const payloads = {
                servicemainfield:servicemainfield,
                servicefield:servicefield,
                homepageheatingservice:homepageheatingservice,
                homepageheatingfeature:homepageheatingfeature,
                homepagewaterservice:homepagewaterservice,
                homepagewaterfeature:homepagewaterfeature
            }
            return response.send(payloads)
        }
        else
        {
          if(!params.slug)
          {
             if(params.type=='isi-yalitimi')
             {
                const heatingpagemainfield = await HeatingPageMainField.first()
                const heatingpage = await HeatingPage.query().orderBy('place','desc').fetch()
                const payloads = {
                    heatingpagemainfield:heatingpagemainfield,
                    heatingpage:heatingpage
                }
                return response.send(payloads)
             }
             else(params.type=='su-yalitimi')
             {
                const waterpagemainfield = await WaterPageMainField.first()
                const waterpage = await WaterPage.query().orderBy('place','desc').fetch()
                const payloads = {
                    waterpagemainfield:waterpagemainfield,
                    waterpage:waterpage
                }
                return response.send(payloads)
             }
          }
          else
          {
            if(params.slug)
             {
               if(params.type=='isi-yalitimi')
               {
                  const heatingpagemainfield = await HeatingPageMainField.query().select('image').limit(1).orderBy('id','asc').fetch()
                  const heatingpagemainfieldjson = heatingpagemainfield.toJSON()[0]
                  const heatingpage = await HeatingPage.query().where('slug',params.slug).fetch()
                  const heatingpagerightpanel = await HeatingPage.query().limit(3).orderBy('place','desc').fetch()
                  const waterpagerightpanel = await WaterPage.query().limit(3).orderBy('place','desc').fetch()
                  const contact = await FixedContact.query().select('telephone','mail').fetch()
                  const heatingandwatercontactbox = await HeatingAndWaterContactBox.first()
                  const heatingandwatereventfield = await HeatingAndWaterEventField.first()
                  const heatingpagejson = heatingpage.toJSON()[0]
                  const heatingevent = await HeatingEvent.query().where('heatingpage_id',heatingpagejson.id).orderBy('place','desc').fetch()
                  const heatingandwatersidebar = await HeatingAndWaterSidebar.first()
                  heatingandwatercontactbox.merge({contact:contact.toJSON()[0]})
                  const payloads = {
                    heatingandwatersidebar:heatingandwatersidebar,
                    heatingpagerightpanel:heatingpagerightpanel,
                    waterpagerightpanel:waterpagerightpanel,
                    heatingpagemainfield:heatingpagemainfieldjson,
                    heatingandwatercontactbox:heatingandwatercontactbox,
                    heatingpage:heatingpagejson,
                    heatingandwatereventfield:heatingandwatereventfield,
                    heatingevent:heatingevent
                  }
                  return response.send(payloads)
               }
               else if (params.type=='su-yalitimi')
               {
                const waterpagemainfield = await WaterPageMainField.query().select('image').limit(1).orderBy('id','asc').fetch()
                const waterpagemainfieldjson = waterpagemainfield.toJSON()[0]
                const waterpage = await WaterPage.query().where('slug',params.slug).fetch()
                const heatingpagerightpanel = await HeatingPage.query().limit(3).orderBy('place','desc').fetch()
                const waterpagerightpanel = await WaterPage.query().limit(3).orderBy('place','desc').fetch()
                const contact = await FixedContact.query().select('telephone','mail').fetch()
                const heatingandwatercontactbox = await HeatingAndWaterContactBox.first()
                const heatingandwatereventfield = await HeatingAndWaterEventField.first()
                const waterpagejson = waterpage.toJSON()[0]
                const waterevent = await WaterEvent.query().where('waterpage_id',waterpagejson.id).orderBy('place','desc').fetch()
                const heatingandwatersidebar = await HeatingAndWaterSidebar.first()
                heatingandwatercontactbox.merge({contact:contact.toJSON()[0]})
                 const payloads = {
                  heatingandwatersidebar:heatingandwatersidebar,
                  heatingpagerightpanel:heatingpagerightpanel,
                  waterpagerightpanel:waterpagerightpanel,
                  waterpagemainfield:waterpagemainfieldjson,
                  heatingandwatercontactbox:heatingandwatercontactbox,
                  waterpage:waterpagejson,
                  heatingandwatereventfield:heatingandwatereventfield,
                  waterevent:waterevent
                }
                return response.send(payloads)
               }
             }
            else(params.type)
             {
            if(params.type=='isi-yalitimi')
            {
               const heatingpagemainfield = await HeatingPageMainField.first()
               const heatingpage = await HeatingPage.query().orderBy('place','desc').fetch()
               const payloads = {
                   heatingpagemainfield:heatingpagemainfield,
                   heatingpage:heatingpage
               }
               return response.send(payloads)
            }
            else(params.type=='su-yalitimi')
            {
               const waterpagemainfield = await WaterPageMainField.first()
               const waterpage = await WaterPage.query().orderBy('place','desc').fetch()
               const payloads = {
                   waterpagemainfield:waterpagemainfield,
                   waterpage:waterpage
               }
               return response.send(payloads)
            }
           }
          }
        }
    }

    async references({params,response})
    {
        if(params.slug)
        {
           const referencesmainfield = await ReferencesMainField.query().select('image').fetch()
           const referencesmainfieldjson = referencesmainfield.toJSON()[0]
           const reference = await Reference.query().where('slug',params.slug).fetch()
           const payloads = {
               referencesmainfield:referencesmainfieldjson,
               reference:reference.toJSON()[0]
           }
           return response.send(payloads)
        }
        else
        {
           const referencesmainfield = await ReferencesMainField.first()
           const reference = await Reference.query().orderBy('place','desc').fetch()
           const payloads = {
               referencesmainfield:referencesmainfield,
               reference:reference
           }
           return response.send(payloads)
       }
    }

    async contact({response})
    {
        const contactpagemainfield = await ContactPageMainField.first()
        const googlemaps = await FixedContact.query().select('googlemaps_url','adress','telephone','telephoneshop','mail').fetch()
        const googlemapsjson = googlemaps.toJSON()[0]
        const contact = await Contact.first()
        const contactfield = await ContactField.first()
        const payloads = {
            contactpagemainfield:contactpagemainfield,
            contact:contact,
            contactfield:contactfield,
            googlemaps:googlemapsjson
        }
        return response.send(payloads)
    }

    async offerapplication({params,response})
    {
       if(!params.id)
       {
        const offerapplication = await OfferApplication.all()
        return response.send(offerapplication)
       }
       else if(params.id)
       {
        const offertype = await OfferType.query().where('offerapplication_id',params.id).fetch()
        return response.send(offertype)
       }
    }

    async offerform({request,response})
    {
      const offerform = new OfferForm()
      const rules = {
         namesurname:'required|max:255',
         companyname:'max:255',
         mail:'required|email|max:255',
         telephone:'required|max:255',
      }
      const messages = {
        'namesurname.required':'Ad Soyadı Girin!',
        'namesurname.max':'Ad Soyad MAX 255 Karakter Olmalıdır!',
        'companyname.max':'Şirket Adı Max 255 Karakter Olmalıdır!',
        'mail.required':'Mail Girin!',
        'mail.email':'Mail @ Örneğine Göre Girin!',
        'mail.max':'Mail MAX 255 Karakter Olmalıdır!',
        'telephone.required':'Telefon Girin!',
        'telephone.max':'Telefon MAX 255 Karakter Olmalıdır!',
      }
      const validation = await validate(request.all(),rules,messages)
      if(validation.fails())
      {
         return response.status(401).json(validation.messages())
      }
      await offerform.merge(request.all())
      await offerform.save()
      return response.send(offerform)
    }

    async contactform({request,response})
    {
        const contactform = new ContactForm()
        const rules = {
          namesurname:'required|max:255',
          email:'required|email|max:255',
          telephone:'required|max:255',
          message:'required'
        }
        const messages = {
          'namesurname.required':'Ad Soyad Girin!',
          'namesurname.max':'Ad Soyad MAX 255 Karakter Olmalıdır!',
          'email.required':'Email Girin!',
          'email.email':'Email @ Örneğine Göre Olmalıdır!',
          'email.max':'Email MAX 255 Karakter Olmalıdır!',
          'telephone.required':'Telefon Numarası Girin!',
          'telephone.max':'Telefon Numarası MAX 255 Karakter Olmalıdır!',
          'message.required':'Mesaj Girin!'
        }
        const validation = await validate(request.all(),rules,messages)
        if(validation.fails())
        {
            return response.status(401).json(validation.messages())
        }
        await contactform.merge(request.all())
        await contactform.save()
        return response.send(contactform)
    }

    async statics({response})
    {
      const reference = await Reference.getCount()
      const offerform = await OfferForm.getCount()
      const contact   = await ContactForm.getCount()
      const waterpage = await WaterPage.getCount()
      const heatingpage = await HeatingPage.getCount()
      const team = await Team.getCount()
      const payloads = {
        reference:reference,
        offerform:offerform,
        contact:contact,
        waterpage:waterpage,
        heatingpage:heatingpage,
        team:team
      }
      return response.send(payloads)
    }

}

module.exports = WebController

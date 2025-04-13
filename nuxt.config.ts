// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com"',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&display=swap',
        },
      ],
    },
  },

  future:{
    compatibilityVersion:4,
  },


  devtools: { enabled: true },


  experimental: {
   scanPageMeta: 'after-resolve',
   sharedPrerenderData: false,
   compileTemplate: true,
   resetAsyncDataToUndefined: true,
   templateUtils: true,
   relativeWatchPaths: true,
   normalizeComponentNames: false,
   spaLoadingTemplateLocation: 'within',
   defaults: {
     useAsyncData: {
       deep: true
     }
   }
 },

  features: {
    inlineStyles: true
  },

  unhead: {
    renderSSRHeadOptions: {
      omitLineBreaks: false
    }
  },

  modules: ['@nuxtjs/google-fonts', '@nuxt/icon', '@nuxt/image', '@prisma/nuxt', '@vueuse/nuxt'],
  image:{
    
  },

  // make some  fonts configurations  in my project 
  googleFonts: {
    // famlies property  this part is to choose the fonts 
    families:{
      Montserrat:true,
      Playfair:true,
    }
  },
  
  css: ['./app/assets/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ]
  }
})
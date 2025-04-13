import jwt from 'jsonwebtoken'


export default defineNuxtPlugin(() => {
  return{
    provide: {
      verifyJwtToken:(token,secret, options) =>{
        return jwt.verify(token,secret,options)
      }
    }
  }
})
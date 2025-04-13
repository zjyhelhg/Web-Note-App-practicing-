//  /api/notes  return all the notes

import prisma from "~~/lib/prisma"
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {


  try {
    const cookies  = parseCookies(event)
    const token =  cookies.NoteNestJWT

    if(!token){
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to access the notes'
      })    
    }


    const decodedToken = await  jwt.verify(token,process.env.JWT_SECRET)

    
    const notes = await prisma.note.findMany({
      where: {
        userId: decodedToken.id,
      }
    }) 

    return notes
  } catch (error) {
    console.log(error);
  }

})
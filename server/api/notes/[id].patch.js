import prisma from "~~/lib/prisma";
import jwt from 'jsonwebtoken'
 
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const id = await getRouterParam(event, 'id')
    const cookies = parseCookies(event);
    const token = cookies.NoteNestJWT;

    
    if(!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }


    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
    
    const noteTryToUpdate =   await prisma.note.findUnique({
      where: {
        id: Number(id),
      }
    })

    if(!noteTryToUpdate){
      throw createError({
        statusCode: 401,
        statusMessage: 'Note does not exist'
      })
    }

    if(noteTryToUpdate.userId !== decodedToken.id){
      throw createError({
        statusCode: 401,
        statusMessage: 'Does not have permission to update note'
      })
    }


    // console.log(id);
    await prisma.note.update({
      where: {
        id: Number(id)
      },
      data: {
        text: body.updatedNote
      }
    })

  } catch (error) {
    console.log(error);
  }
})
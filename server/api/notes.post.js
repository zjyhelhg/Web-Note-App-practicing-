import jwt from 'jsonwebtoken'
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
  try {

    const cookies = parseCookies(event);
    const token = cookies.NoteNestJWT;

    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authorized to update',
      })
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
  const newNote    =    await prisma.note.create({
      data: {
        text: '',
        userId: decodedToken.id,
      },
    })
    return newNote
  

  } catch (error) {
    console.error('出错了：', error); // 加这一行

    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Could not verify token'
    })

  }
})
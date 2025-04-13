import prisma from "~~/lib/prisma"

import bcrypt from 'bcryptjs'
import validator from 'validator';
import jwt from 'jsonwebtoken'
 


export default defineEventHandler(async (event) => {
  try {


    const body = await readBody(event)
    if (!validator.isEmail(body.email)) {
      throw createError({
        statusCode: 400,
        message: 'Invalid email, Please try again.',
      })
    }


    if (!validator.isStrongPassword(body.password,{
      minLength: 8,
      minLowercase: 1,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
    })) {
      throw createError({
        statusCode: 400,
        message: 'Password is not minimum 8 characters At least one uppercase lowercase and one special character.',
      })
    }

     


    // 生成一个salt 就是 一个随机数 目的是让同样的密码每次加密后都不一样， 防止被破解
    // genSalt(10[代表密码强度])
    const salt = await bcrypt.genSalt(10)

    const passwordHash = await bcrypt.hash(body.password, salt)


    // Sends to  database 
    const user=  await prisma.user.create({

      data: {

        email: body.email,
        password: passwordHash,
        salt: salt,

      }

    })
    const token = jwt.sign(
      { id: user.id }, 
      // 这个是用于签名的密钥
      process.env.JWT_SECRET, 
      
    );
    console.log('TOKEN:');
    console.log(token);
    
    setCookie(event,'NoteNestJWT',token)
   
    // --node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
    // 这条命令的意思就是 —— 给我生成一个超难猜的密钥字符串！
    return { data: 'success!' }
  } catch (error) {
    console.log(error.code);

    if (error.code === 'P2002') {
      throw createError({
        statusCode: 409,
        message: 'An email with this Address is  already exists.',
      })
    }
    // 获取到错误之后就抛出这个错误
    throw error
  }
}) 
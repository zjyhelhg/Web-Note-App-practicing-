 
export default defineNuxtRouteMiddleware( async(event) => {
  const { $verifyJwtToken } = useNuxtApp()
  

  const jwt = useCookie('NoteNestJWT')

  // console.log(jwt.value);

  if(!jwt.value){
    return  navigateTo('/register')
  } 
  // 处理 jwt 与 密钥之间的一个验证  知道令牌有效 用户应该能够访问索引页面
  try{
   await $verifyJwtToken(jwt.value, process.env.JWT_SECRET)
  } catch(error) {
    console.log(error);

  }
})
<script setup>
  import Swal from 'sweetalert2'
  const email = ref('')
  const password = ref('')

  async function submit() {

    console.log(email.value);
    console.log(password.value);

    try {
      const response = await $fetch('/api/user', {

        method: 'POST',
        body: {
          email: email.value,
          password: password.value
        }
      })
      const { isConfirmed }= await  Swal.fire({
        title: 'Success!',
        text: 'Account Created Successfully!',
        icon: 'success',
        confirmButtonText: 'Close',
      })

      if(isConfirmed){
        // 有效了 那么就跳转首页
        navigateTo('/')
      }

    } catch (error) {
      console.log('ERROR: ');
      console.log(error.response?._data?.message);
      Swal.fire({
        title: 'Error!',
        text: error.response?._data?.message,
        icon: 'error',
        confirmButtonText: 'Close'
      })
    }
  }

</script>

<template>

  <!-- SideBar -->
  <div class="flex h-screen bg-black ">
    <div class="bg-zinc-900  p-12 w-[516px] flex flex-col justify-center">
      <div class="flex">
        <Logo class="w-[34px] h-[34px]"></Logo>
        <h1 class="text-3xl text-amber-600 ">
          NoteNest
        </h1>
      </div>

      <h1 class="mt-8 text-lg font-bold text-white">Sign up for a free account</h1>

      <nuxtLink to="/login" class="text-sm text-zinc-300">Already registered? <span class="font-bold text-[#FFAC00] underline">Log
          in</span> to your account</nuxtLink>
        <!-- form  表单  -->
      <form @submit.prevent="submit">
        <div class="mt-12">
          <label for="" class="block text-white mb-0.5">Emali Address</label>
          <input v-model="email" type="text" placeholder="you@example.com"
            class=" placeholder:text-zinc-500 block w-full bg-[#27272A] text-white  border border-[#3F3F46] px-4 py-2 rounded-sm">
        </div>
        <div class="mt-5">
          <label for="" class="block text-white mb-0.5">Password</label>
          <input v-model="password" type="password" placeholder="**************"
            class=" placeholder:text-zinc-500 block w-full bg-[#27272A] text-white  border border-[#3F3F46] px-4 py-2 rounded-sm">
        </div>
        <!-- sign up Button -->
        <div>
          <button
            class="flex items-center justify-center w-full px-4 py-2 mt-5 space-x-4 font-bold rounded-full cursor-pointer bg-amber-400">Sign
            up <LeftArrow></LeftArrow></button>
        </div>
      </form>


    </div>




    <!-- Note  Introduction -->
    <div>

    </div>

  </div>
</template>
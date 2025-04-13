<template>

  <div class="flex h-screen bg-zinc-900 ">
    <!-- SideBar -->
    <div class="bg-black  p-7 w-[340px]  flex flex-col  overflow-scroll">
      <div>
        <div class="flex">
          <Logo class="w-[34px] h-[34px]"></Logo>
          <h1 class="text-3xl text-amber-600 ">
            NoteNest
          </h1>
        </div>
      </div>
      <!-- today main container -->
      <div class="flex-grow">
        <p class="text-md font-bold text-[#C2C2C5]  mb-4 mt-12">Today</p>
        <div class="ml-2 space-y-2">
          <div v-for="note in todaysNotes" class="p-2 rounded-lg cursor-pointer" :class="{ 
            'bg-[#A1842C]': note.id === selectedNote.id, 
            'hover:bg-[#A1842C]/50': note.id !== selectedNote.id 
          }" 
          @click="setNote(note)"
          >
            <h3 class="text-sm truncate font-bold text-[#F4F4F5]">{{note.text.substring(0,50)}}</h3>
            <div class="leading-none">
              <span class="text-xs  text-[#F4F4F5] mr-4">{{
                new Date(note.updateAt).toLocaleDateString() ===
                new Date().toLocaleDateString()
                ? 'Today'
                : new Date(note.updateAt).toLocaleDateString()
                }}</span>
              <span v-if="note.text.length > 50"
                class="text-xs  text-[#D6D6D6]">{{note.text.substring(50,70)}}...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- yesterday main container -->
      <div>
        <p class="text-md font-bold text-[#C2C2C5]  mb-4 mt-12">Yesterday</p>
        <div class="ml-2 space-y-2">
          <div v-for="note in yesterdaysNotes" class="p-2 rounded-lg cursor-pointer" :class="{ 
            'bg-[#A1842C]': note.id === selectedNote.id, 
            'hover:bg-[#A1842C]/50': note.id !== selectedNote.id 
          }" @click="setNote(note)">
            <h3 class="text-sm truncate font-bold text-[#F4F4F5]">{{note.text.substring(0,50)}}</h3>
            <div class="leading-none">
              <span class="text-xs  text-[#F4F4F5] mr-4">{{
                new Date(note.updateAt).toLocaleDateString() ===
                new Date().toLocaleDateString()
                ? 'Today'
                : new Date(note.updateAt).toLocaleDateString()
                }}</span>
              <span   v-if="note.text.length > 50" class="text-xs  text-[#D6D6D6]">{{note.text.substring(50,70)}}...</span>
            </div>
          </div>
        </div>
      </div>

      <!-- early main container -->
      <div>
        <p class="text-md font-bold text-[#C2C2C5]  mb-4 mt-12">Earlier</p>
        <div class="ml-2 space-y-2">
          <div v-for="note in earlierNotes" class="p-2 rounded-lg cursor-pointer" :class="{ 
            'bg-[#A1842C]': note.id === selectedNote.id, 
            'hover:bg-[#A1842C]/50': note.id !== selectedNote.id 
          }" @click="setNote(note)">
            <h3 class="text-sm truncate font-bold text-[#F4F4F5]">{{note.text.substring(0,50)}}</h3>
            <div class="leading-none">
              <span class="text-xs  text-[#F4F4F5] mr-4">{{
                new Date(note.updateAt).toLocaleDateString() ===
                new Date().toLocaleDateString()
                ? 'Today'
                : new Date(note.updateAt).toLocaleDateString()
                }}</span>
              <span class="text-xs  text-[#D6D6D6]">{{ note.text.substring(50,70) }}...</span>
            </div>
          </div>
        </div>
      </div>

    </div>
    <!-- Sidebar -->


    <!-- note container -->
    <div class="flex flex-col w-full">
      <div class="flex items-start justify-between w-full p-8">
        <button @click="createNewNote" class="text-[#C2C2C5] text-sm hover:text-white font-bold inline-flex space-x-2">
          <PencilIcon /> <span>Create Note</span>
        </button>

        <button class="text-[#C2C2C5]">
          <TrashIcon class=" text-[#6D6D73] hover:text-white"></TrashIcon>
        </button>
      </div>


      <!-- note middle -->
      <div class="max-w-[545px]     mx-auto    w-full flex-grow flex  flex-col">
        <p class="text-[#929292] font-playfair">{{ new Date(selectedNote.updateAt).toLocaleDateString()}}</p>
        <textarea @input="() => {
          debounceFn()
          selectedNote.text = updatedNote
        }" v-model="updatedNote" ref="textarea"
          class="text-[#D4D4D4]  resize-none  flex-grow my-2 font-playfair w-full focus:outline-0" name="note"
          id="note">
        </textarea>

      </div>
      <button @click="logout"
        class="absolute bottom-0 right-0 p-8 font-bold cursor-pointer text-zinc-400 hover:text-white text-md">Log
        out</button>

    </div>

    <!-- note container -->


  </div>
</template>
<script setup>
  const updatedNote = ref('')
  const notes = ref([])
  const selectedNote = ref({})
  const textarea = ref(null)

  function setNote(note) {
  selectedNote.value = note
  updatedNote.value = note.text
}
 

  function logout() {
    const jwtCookie = useCookie('NoteNestJWT')
    jwtCookie.value = null
    navigateTo('/login')
  }


  async function createNewNote() {
    try {

      const newNote = await $fetch(`/api/notes`, {
        method: 'POST',
      })
      notes.value.unshift(newNote)
      selectedNote.value = notes.value[0]
      updatedNote.value = ''
      textarea.value.focus()

    } catch (error) {
      console.log(error);
    }
  }


  const debounceFn = useDebounceFn(async () => {
    await updateNote()
  }, 1000)

  async function updateNote() {
    console.log(updatedNote.value);
    try {
      $fetch(`/api/notes/${selectedNote.value.id}`, {
        method: 'PATCH',
        body: {
          updatedNote: updatedNote.value
        }
      });

    } catch (error) {
      console.log(error);
    }

  }


  definePageMeta({
    // 选择使用中间件  每当访问index页面的时候
    middleware: ['auth']
  })


  const todaysNotes = computed(() => {
    return notes.value.filter((note) => {
      const noteDate = new Date(note.updateAt)
      return noteDate.toLocaleDateString() === new Date().toLocaleDateString()
    })
  })



  const yesterdaysNotes = computed(() => {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    return notes.value.filter((note) => {
      const noteDate = new Date(note.updateAt)
      return noteDate.toLocaleDateString() === yesterday.toLocaleDateString()
    })

  })

  const earlierNotes = computed(() => {
    const yesterday = new Date()

    yesterday.setDate(yesterday.getDate() - 1)

    return notes.value.filter((note) => {
      const noteDate = new Date(note.updateAt)
      return noteDate < yesterday
    })

  })


  onMounted(async () => {
    notes.value = await $fetch('/api/notes')

    notes.value.sort((a, b) => new Date(b.updateAt) - new Date(a.updateAt))

    if (notes.value.length > 0)
      selectedNote.value = notes.value[0]
    else {
      await createNewNote()
      selectedNote.value = notes.value[0]
    }
    updatedNote.value = selectedNote.value.text
    textarea.value.focus()


  })
</script>
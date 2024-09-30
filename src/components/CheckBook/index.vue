<template>
    <div>
      <input type="checkbox" :id="bookId" v-model="isChecked" class="w-4 h-4"/>
      <label :for="bookId" class="text-[#303030]">{{ title }}</label>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      bookId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isChecked: false
      }
    }
  }
  </script>
  
  <style scoped>
  /* Tambahkan gaya sesuaikan jika diperlukan */
  </style>
  
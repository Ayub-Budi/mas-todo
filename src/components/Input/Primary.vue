<template>
    <input
      :type="type" 
      v-model="formData.value"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5 pl-[48px]  rounded-[16px] py-[16px] px-[20px]"
      :placeholder="placeholder"
      required
    />
  </template>
  
  <script>
  export default {
    props: {
      type: {
        type: String,
        default: "text",
      },
      placeholder: {
        type: String,
        default: "Masukkan input...",
      }
    },
    data() {
      return {
        formData: {
          value: "",
        },
      };
    },
  };
  </script>
  
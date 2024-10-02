<template>
    <input
      :type="type" 
      v-model="formData.value"
      :class="customInput"
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
      },
      intent: {
        type: String,
        default: "primary",
      },
    },
    computed: {
      customInput() {
        const baseClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:outline-blue-500 block";
        const variantClass = {
          primary: "w-full p-2.5 pl-[48px]  rounded-[16px] py-[16px] px-[20px]",
          primary2: "w-full p-2.5  rounded-[16px] py-[16px] px-[20px]",
        };
        return `${baseClass} ${variantClass[this.intent]}`;
      },
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
  
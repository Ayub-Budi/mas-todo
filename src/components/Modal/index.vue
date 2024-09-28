<template>
    <div
      v-if="isOpen"
      class="bg-[#000000B2] w-full h-full absolute inset-0 bg-opacity-80"
      @click.self="closeModal"
    >
      <div
        class="bg-gray-200 h-full absolute rounded-[24px] right-0 top-1/2 transform -translate-y-1/2 p-4"
      >
        <div class="flex justify-between">
          <h1>{{ title }}</h1>
          <button @click="closeModal">X</button>
        </div>
  
        <div class="py-2">
          <!-- The default slot where the input form will go -->
          <slot></slot>
        </div>
  
        <!-- Submit button -->
        <ButtonPrimary class="w-full" @click="handleSubmit">{{ submitLabel }}</ButtonPrimary>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true
      },
      title: {
        type: String,
        default: 'Modal Title'
      },
      submitLabel: {
        type: String,
        default: 'Submit'
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      handleSubmit() {
        this.$emit('submit');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any additional styles for the modal here if needed */
  </style>
  
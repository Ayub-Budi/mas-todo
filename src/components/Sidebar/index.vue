<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50" @click="closeModal">
      <div class="fixed inset-y-0 right-0 w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out"
           :class="{ 'translate-x-0': isOpen, 'translate-x-full': !isOpen }"
           @click.stop>
        <div class="flex justify-between items-center p-4 border-b">
          <h2 class="text-lg font-semibold">{{ title }}</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-black">&times;</button>
        </div>
        <div class="p-4 overflow-y-auto">
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        default: "Right Sidebar Modal",
      },
      isOpen: {
        type: Boolean,
        required: true,
      },
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
    },
  };
  </script>
  
<template>
  <div
    v-if="isOpen"
    class="bg-[#000000B2] w-full h-full fixed inset-0 bg-opacity-80 p-[12px] flex justify-end items-start"
    @click.self="closeModal"
  >
    <div class="bg-[#F9FBFE] h-full w-[500px] p-[12px] rounded-[24px]">
      <div class="flex justify-between">
        <h1 class="text-[21px] font-bold">{{ title }}</h1>
        <button @click="closeModal">
          <i class="ri-close-fill text[12.73px]"></i>
        </button>
      </div>

      <div class="py-2">
        <slot></slot>
      </div>

      <!-- Error display -->
      <div v-if="error" class="text-red-500 text-sm mt-2">
        {{ error }}
      </div>

      <ButtonPrimary class="w-full" @click="handleSubmit">{{ submitLabel }}</ButtonPrimary>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
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
    },
    error: { 
      type: String, 
      default: '' 
    }
  },
  computed: {
    isOpen() {
      return this.modelValue;
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:modelValue', false);
    },
    handleSubmit() {
      this.$emit('submit');
    }
  }
};
</script>

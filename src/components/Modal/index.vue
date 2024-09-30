<template>
  <div
    v-if="isOpen"
    class="bg-[#000000B2] w-full h-full fixed inset-0 bg-opacity-80 p-[12px] flex justify-end items-start"
    @click.self="closeModal"
  >
    <div class="bg-[#F9FBFE] h-full p-[12px] rounded-[24px]">
      <div class="flex justify-between">
        <h1>{{ title }}</h1>
        <button @click="closeModal">X</button>
      </div>

      <div class="py-2">
        <!-- Slot untuk form input -->
        <slot></slot>
      </div>

      <!-- Tombol submit -->
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

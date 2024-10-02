<template>
  <div class="flex items-center">
    <input
      :class="customChackBox"
      type="checkbox"
      :id="bookId"
      v-model="isChecked"
    />
    <label :for="bookId" class="text-[#303030] text-[14px] font-bold">{{ title }}</label>
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
    checked: {
      type: Boolean,
      default: false,
    },
    intent: {
      type: String,
      default: "primary",
    },
  },
  computed: {
    customChackBox() {
      const baseClass = "accent-[#007DFC]";
      const variantClass = {
        primary: "mr-2 w-[18px] h-[18px]",
      };
      return `${baseClass} ${variantClass[this.intent]}`;
    },
  },
  data() {
    return {
      isChecked: this.checked, 
    };
  },
  watch: {
    checked(newValue) {
      this.isChecked = newValue;
    },
  },
};
</script>


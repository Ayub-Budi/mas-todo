<template>
  <button
    :class="customButton"
    :type="type"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "button",
    },
    intent: {
      type: String,
      default: "primary"
    }
  },
  computed: {
    customButton() {
      const baseClass = "bg-white text-[#005bb5] border border-[#005bb5]";
      const variantClass = {
        primary: "rounded-[16px] py-[16px] px-[20px]",
      }
      return `${baseClass} ${variantClass[this.intent]}`
    }
  }
};
</script>

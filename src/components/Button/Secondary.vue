<template>
  <button
    class="bg-white text-[#005bb5] border border-[#005bb5] p-2 rounded-md"
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
  },
};
</script>

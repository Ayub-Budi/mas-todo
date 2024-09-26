<template>
  <button class="bg-[#007DFC] p-2 rounded-md text-white hover:bg-[#0071E3]" :type="type">
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button',
    },
  }
}
</script>

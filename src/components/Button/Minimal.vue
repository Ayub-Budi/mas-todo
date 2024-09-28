<template>
  <button class="p-2 rounded-md text-[#007DFC] hover:bg-[#E6F2FF] active:bg-[#B0D7FE] focus:bg-[#B0D7FE] disabled:text-[#ACACAC]" :type="type">
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
  
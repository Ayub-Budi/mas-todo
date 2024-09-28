<template>
  <button class="p-2 rounded-md text-[#ACACAC] hover:bg-[#E6F2FF] active:bg-[#B0D7FE] active:text-[#007DFC] focus:bg-[#B0D7FE] focus:text-[#007DFC] disabled:text-[#ACACAC]" :type="type">
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
  
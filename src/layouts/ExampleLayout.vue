<template>
  <Navbar></Navbar>
  <div class="p-[21px]">
    <slot />
  </div>
</template>

<script>
  import {
    useAuthStore
  } from "@/stores/auth.store.js"

export default {
  name: 'ExampleLayout',
  data(){
    return {
      authStore: useAuthStore()
    }
  }
};
</script>

<style>
  .link{
    @apply px-2 cursor-pointer hover:text-red-400;
  }
</style>

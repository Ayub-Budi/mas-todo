<template>
    <nav class="p-[24px]">
        <div class="h-[75px] shadow shadow-[#63636333] rounded-[24px] flex justify-between items-center px-4">
            <div class="flex items-center">
                <img src="@/assets/logo1.svg" alt="Logo">
            </div>
            <div class="relative flex items-center">
                <div @click="toggleDropdown" class="link flex items-center cursor-pointer">
                {{ authStore.user.name }}
                <img src="@/assets/profile.jpg" alt="Profile Icon" class="ml-2 w-8 h-8 rounded-full"/>
                </div>
                <!-- Dropdown Menu -->
                <div v-if="dropdownOpen" 
                    class="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg"
                    @click.stop>
                <div class="px-4 py-2 font-semibold border-b text-black">
                    {{ authStore.user.name }}
                </div>
                <div @click="authStore.logout" class="link px-4 py-2 hover:bg-gray-100 text-black cursor-pointer">
                    Logout
                </div>
                </div>
            </div>
        </div>
    </nav>
</template>
  
  <script>
  import { useAuthStore } from "@/stores/auth.store.js"
  
  export default {
    name: 'ExampleLayout',
    data() {
      return {
        authStore: useAuthStore(),
        dropdownOpen: false
      };
    },
    methods: {
      toggleDropdown(event) {
        event.stopPropagation();
        this.dropdownOpen = !this.dropdownOpen;
      },
      closeDropdown() {
        this.dropdownOpen = false;
      }
    },
    mounted() {
      document.addEventListener('click', this.closeDropdown);
    },
    beforeUnmount() {
      document.removeEventListener('click', this.closeDropdown);
    }
  };
  </script>
  
  <style scoped>
  .link {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }
  
  .link:hover {
    color: #007BFF;
  }
  </style>
  
<template>
  <div class="flex items-center w-screen h-screen">
    <div class="bg-white shadow-md rounded-lg pt-[52px] pb-[52px] px-[24px] w-[600px] mx-auto">
      <img src="../../../assets/logo1.svg" alt="logo" class="w-[154px] h-[38px]" />

      <div class="pt-[24px] pb-[24px]">
        <h3 class="text-[28px] font-bold">Daftar</h3>
        <p class="text-[14px]">Masukan informasi anda untuk mendaftar di aplikasi</p>
      </div>

      <form action="" @submit.prevent="register">
        <div class="mb-6">
          <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <div class="relative group">
            <input
              v-model="formData.email"
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5 pl-10 pr-4 py-2"
              placeholder="Masukan email..."
              required
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="ri-mail-line text-gray-400 group-focus-within:text-blue-500"></i>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Nama</label>
          <div class="relative group">
            <input
              v-model="formData.name"
              type="name"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5 pl-10 pr-4 py-2"
              placeholder="Masukan nama..."
              required
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="ri-user-line text-gray-400 group-focus-within:text-blue-500"></i>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900">Nomor telepon</label>
          <div class="relative group">
            <input
              v-model="formData.phone_number"
              type="text"
              id="phone_number"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5 pl-10 pr-4 py-2"
              placeholder="Masukan nomor telepon.."
              required
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="ri-phone-line text-gray-400 group-focus-within:text-blue-500"></i>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
          <div class="relative group">
            <input
              v-model="formData.password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5 pl-10 pr-10 py-2"
              placeholder="•••••••••"
              required
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="ri-lock-line text-gray-400 group-focus-within:text-blue-500"></i>
            </div>
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              @click="togglePasswordVisibility"
            >
              <i v-if="!showPassword" class="ri-eye-off-line text-gray-400"></i>
              <i v-else class="ri-eye-line text-gray-400"></i>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label for="confirmPassword" class="block mb-2 text-sm font-medium text-gray-900">Masukan ulang password</label>
          <div class="relative group">
            <input
              v-model="formData.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              id="confirmPassword"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5 pl-10 pr-10 py-2"
              placeholder="•••••••••"
              required
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i class="ri-lock-line text-gray-400 group-focus-within:text-blue-500"></i>
            </div>
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              @click="togglePasswordVisibility"
            >
              <i v-if="!showPassword" class="ri-eye-off-line text-gray-400"></i>
              <i v-else class="ri-eye-line text-gray-400"></i>
            </div>
            <p v-if="passwordMismatch" class="text-red-500 text-sm mt-1">Password tidak cocok</p>
          </div>
        </div>

        <ButtonPrimary class="w-full" :type="'submit'">Register</ButtonPrimary>

        <div class="relative flex py-5 items-center">
          <div class="flex-grow border-t border-gray-400"></div>
          <span class="flex-shrink mx-4">Sudah punya akun?</span>
          <div class="flex-grow border-t border-gray-400"></div>
        </div>

        <ButtonSecondary class="w-full" @click="$router.push('/login')">Login</ButtonSecondary>
      </form>
    </div>
  </div>
  <!-- <form action="" @submit.prevent="register">
    <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
        <input v-model="formData.name" type="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John Doe" required>
    </div>
    <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
        <input v-model="formData.email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john.doe@company.com" required>
    </div>
    <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
        <input v-model="formData.password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="•••••••••" required>
    </div>
    <ButtonPrimary :type="'submit'">
      Register
    </ButtonPrimary>
    <ButtonDanger @click="$router.push('/login')" class="ml-3">
      Login
    </ButtonDanger>
  </form> -->

</template>

<script>
  import {
    useAuthStore
  } from "@/stores/auth.store.js"

  export default {
  data() {
    return {
      authStore: useAuthStore(),
      formData: {
        name: null,
        email: null,
        phone_number: null,
        password: null,
        confirmPassword: null,
      },
      showPassword: false,
      passwordMismatch: false,
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async register() {
      if (this.formData.password !== this.formData.confirmPassword) {
        this.passwordMismatch = true;
        return;
      }

      this.passwordMismatch = false;
      await this.authStore.register(this.formData);
    },
  },
};


</script>

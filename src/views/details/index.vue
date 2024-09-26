<template>
    <div v-if="project">
      <div class="flex justify-between">
        <div>
          <h1>Project</h1>
        </div>
        <div>
          <ButtonPrimary @click="setModal">+ Buat project baru</ButtonPrimary>
        </div>
      </div>
      <h1>{{ project.name }}</h1>
  
      <!-- Menampilkan daftar todo -->
      <div v-if="project.todo && project.todo.length > 0">
        <h2>Tasks:</h2>
        <ul>
          <li v-for="todo in project.todo" :key="todo.id">
            {{ todo.description }} - <span>{{ todo.is_complete ? 'Selesai' : 'Belum Selesai' }}</span>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Tidak ada tugas untuk ditampilkan.</p>
      </div>
    </div>
    <div v-else>
      <p>Project tidak ditemukan.</p>
    </div>
  </template>
  
  <script>
  import { usePeojectStore } from "@/stores/project.store.js"; // Import store
  
  export default {
    props: ['id'], // Menerima id sebagai props
    data() {
      return {
        projectStore: usePeojectStore(),
        project: null,
      };
    },
    async mounted() {
      await this.loadProject(); // Panggil fungsi loadProject saat komponen dipasang
    },
    watch: {
      id: {
        immediate: true,
        handler() {
          this.loadProject(); // Panggil loadProject saat 'id' berubah
        }
      }
    },
    methods: {
      async loadProject() {
        // Coba ambil detail project dari store berdasarkan id
        await this.projectStore.detail(this.id);
        this.project = this.projectStore.project;
  
        // Jika tidak ditemukan, fetch ulang data dari server
        if (!this.project) {
          await this.projectStore.fetch();
          await this.projectStore.detail(this.id);
          this.project = this.projectStore.project;
        }
      },
      setModal() {
        // Implementasikan logika untuk membuka modal
      }
    }
  };
  </script>
  
<template>
  <div v-if="projects.length > 0">
    <div class="flex justify-between">
      <div>
        <h2 class="text-[24px] font-bold">Project</h2>
      </div>

      <div>
        <ButtonPrimary @click="openModal" :intent="'primary2'">+ Buat project baru</ButtonPrimary>
      </div>
    </div>

    <div>
      <ButtonMinimal :class="{ 'active': filterStatus === 'all' }" @click="filterStatus = 'all'">Semua</ButtonMinimal>
      <ButtonMinimal :class="{ 'active': filterStatus === 'completed' }" @click="filterStatus = 'completed'">Terselesaikan</ButtonMinimal>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-5">

      <Card v-for="project in paginatedProjects" :key="project.id" :project="project" v-on:todoValue="toggleComplete"></Card>
      
    </div>
    
    <!-- Pagination -->
    <div class="flex justify-between mt-5">
      <div><p class="text-[14px] text-[#303030] font-medium">Menampilkan {{ startItem }} sampai {{ endItem }} dari {{ totalProjects }} keseluruhan</p></div>
      <div>
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded-[12px]"
        >
          Prev
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="[
            'px-3 py-1 mx-1',
            currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700',
          ]"
          class="rounded-[12px]"
        >
          {{ page }}
        </button>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 mx-1 bg-gray-200 text-gray-700 rounded-[12px]"
        >
          Next
        </button>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="flex justify-center items-center h-screen">
      <div class="text-center">
        <h1 class="font-semibold text-lg text-[24px]">Belum ada project</h1>
        <img src="@/assets/noData.svg" alt="Image" class="mt-4" />
        <p class="text-[16px] text-[#6E6E6E]">
          Saat ini anda belum menambahkan project, buat project terlebih dahulu
        </p>
        <ButtonPrimary class="mt-[10px]" :intent="'primary2'" @click="openModal">Buat project</ButtonPrimary>
        <!-- <ButtonPrimary @click="setModal">+ Buat project baru</ButtonPrimary> -->

      </div>
    </div>
  </div>


  <Modal :modelValue="isModalOpen" @update:modelValue="isModalOpen = false" title="Tambah project baru" submitLabel="Submit" @submit="submitProject">
    <div class="py-2">
      <label for="namaProject" class="block mb-2 text-sm font-medium text-gray-900">Nama project</label>
      <InputPrimary v-model="formData.name" type="text" id="namaProject" placeholder="Masukan nama project..." required></InputPrimary>
    </div>
  </Modal>
</template>

<script>
import { useCounterStore } from "@/stores/counter.store.js";
import { usePeojectStore } from "@/stores/project.store.js";
import { useTodoStore } from "@/stores/todo.store.js";

export default {
  data() {
    return {
      counterStore: useCounterStore(),
      projectStore: usePeojectStore(),
      todoStore: useTodoStore(),
      formData: {
        name: null,
      },
      currentPage: 1,
      itemsPerPage: 6,
      isOpen: false,
      isModalOpen: false,
      filterStatus: 'all',
    };
  },

  computed: {
    projects() {
    if (this.filterStatus === 'completed') {
      return this.projectStore.projects.filter(project =>
        this.totalTodos(project) === this.completedTodos(project)
      );
    } else if (this.filterStatus === 'all') {
      return this.projectStore.projects;
    }
    return [];
  },
    teams() {
      return this.teamStore.teams;
    },

    totalPages() {
      return Math.ceil(this.projects.length / this.itemsPerPage);
    },

    paginatedProjects() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.projects.slice(start, end);
    },

    totalProjects() {
      return this.projects.length;
    },

    startItem() {
      return (this.currentPage - 1) * this.itemsPerPage + 1;
    },

    endItem() {
      return Math.min(this.currentPage * this.itemsPerPage, this.totalProjects);
    },
  },
  methods: {
    totalTodos(project) {
      return project.todo.length;
    },
    completedTodos(project) {
        return project.todo.filter(todo => todo.is_complete).length;
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },

    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },

    handleClick(event) {
      const sidebar = document.getElementById("sidebar");
      if (
        !sidebar.contains(event.target) &&
        !event.target.closest("ButtonPrimary")
      ) {
        this.closeSidebar();
      }
    },
    async toggleComplete(todo) {
      console.log('home', todo)
      try {
        const updatedStatus = !todo.is_complete;
        await this.todoStore.update(todo.id, {
          description: todo.description,
          is_complete: updatedStatus,
        });
        todo.is_complete = updatedStatus;
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    },
    async submitProject() {
      if (!this.formData.name) {
        alert('Nama project tidak boleh kosong');
        return;
      }
      try {
        await this.projectStore.add(this.formData);
        this.formData.name = null;
        this.projectStore.fetch();
      } catch (error) {
        console.error("Gagal menambahkan project:", error);
      }
    },
  },
  mounted() {
    this.projectStore.fetch();
  },
};
</script>

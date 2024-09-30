<template>
  <div v-if="projects.length > 0">
    <div class="flex justify-between">
      <div>
        <h1>Project</h1>
      </div>

      <div>
        <ButtonPrimary @click="openModal">+ Buat project baru</ButtonPrimary>
      </div>
    </div>

    <div>
      <ButtonMinimal :class="{ 'active': filterStatus === 'all' }" @click="filterStatus = 'all'">Semua</ButtonMinimal>
      <ButtonMinimal :class="{ 'active': filterStatus === 'completed' }" @click="filterStatus = 'completed'">Terselesaikan</ButtonMinimal>
    </div>

    <div class="grid grid-cols-3 gap-4 mt-5">
      <div
        v-for="project in paginatedProjects"
        :key="project.id"
        class="border flex flex-warp flex-col rounded-[24px] py-6 gap-4"
      >
        <div class="flex-1 px-4">
          <h1>{{ project.name }}</h1>

          <div class="mt-4">
            <div class="w-full h-4 bg-gray-200 rounded-full">
              <div
                class="h-4 bg-blue-600 rounded-full"
                :style="{ width: projectCompletionPercentage(project) + '%' }"
              ></div>
            </div>

            <div class="flex justify-between">
              <div><p>{{ projectStatus(project) }}</p></div>
              <div>
                <p class="text-sm mt-2 text-gray-700">
                  {{ completedTodos(project) }}/{{ totalTodos(project) }} Selesai
                </p>
              </div>
            </div>
            
          </div>
        </div>
        <span class="border-t-2 w-full"></span>
        <div class="flex-1 px-4">
          <div
            v-for="todo in project.todo.slice(0, 3)"
            :key="todo.id"
            class="mt-2"
          >
            <label>
              <input
                type="checkbox"
                :checked="todo.is_complete"
                @change="toggleComplete(todo)"
                class="mr-2 w-4 h-4"
              />
              {{ todo.description }}
            </label>
          </div>
        </div>
        <div class="shrink-0 flex px-4">
          <ButtonPrimary class="flex-1" @click="$router.push({ name: 'ProjectDetail', params: { id: project.id } })">Lihat semua</ButtonPrimary>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-between mt-5">
      <div><p>Menampilkan {{ startItem }} sampai {{ endItem }} dari {{ totalProjects }} keseluruhan</p></div>
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
        <ButtonPrimary @click="setModal">Buat project</ButtonPrimary>
        <!-- <ButtonPrimary @click="setModal">+ Buat project baru</ButtonPrimary> -->

      </div>
    </div>
  </div>


  <Modal :modelValue="isModalOpen" @update:modelValue="isModalOpen = false" title="Tambah project baru" submitLabel="Submit" @submit="submitProject">
    <div class="py-2">
      <label for="namaProject" class="block mb-2 text-sm font-medium text-gray-900">Nama project</label>
        <input
          type="text"
          id="namaProject"
          v-model="formData.name"
          placeholder="Masukan nama project"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5 pl-10 pr-[20px] py-2"
        />
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
      // Filter projects based on the filterStatus value
      if (this.filterStatus === 'completed') {
        return this.projectStore.projects.filter(project =>
          this.totalTodos(project) === this.completedTodos(project)
        );
      }
      return this.projectStore.projects;
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
    completedTodos(project) {
      return project.todo.filter((todo) => todo.is_complete).length;
    },

    totalTodos(project) {
      return project.todo.length;
    },

    projectStatus(project) {
      const total = this.totalTodos(project);
      const completed = this.completedTodos(project);
      return total === completed ? 'Selesai' : 'Belum Selesai';
    },

    projectCompletionPercentage(project) {
      const total = this.totalTodos(project);
      const completed = this.completedTodos(project);
      return total > 0 ? Math.round((completed / total) * 100) : 0;
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

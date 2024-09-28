<template>
  <div v-if="project">
    <div class="flex justify-between">
      <div>
        <h1>{{ project.name }}</h1>
      </div>
      <div class="flex gap-[10px]">
        <div>
          <ButtonPrimary @click="openModal1 = true"
            >+ Buat project baru</ButtonPrimary
          >
        </div>
        <div>
          <ButtonPrimary @click="openModal2 = true"
            >+ Undang personil</ButtonPrimary
          >
        </div>
        <div>
          <button
            @click="showAlert"
            class="bg-[#E4574E] p-2 rounded-md text-white hover:bg-[#B2443D]"
          >
            Keluar project
          </button>
        </div>
      </div>
    </div>

    <div class="flex flex-col" v-if="project.todo && project.todo.length > 0">
      <h2>Tasks:</h2>

      <div
        v-for="todo in project.todo"
        :key="todo.id"
        class="flex-1 flex flex-row sp ace-x-4 px-[18px] py-[20px]"
      >
        <div class="flex-1">
          <!-- <label>
            <input type="checkbox" v-model="todo.is_complete" class="mr-2" />
            {{ todo.description }}
          </label> -->
          <label>
            <!-- The @change event triggers the method to update is_complete -->
            <input
              type="checkbox"
              :checked="todo.is_complete"
              @change="toggleComplete(todo)"
              class="mr-2"
            />
            {{ todo.description }}
          </label>
        </div>
        <div class="flex-1 gap-[8px]">
          <span>Created by</span> <span>{{ todo.created_by }}</span>
        </div>
        <div class="flex-1 gap-[8px]">
          <span>Created at</span> <span>{{ formatDate(todo.created_at) }}</span>
        </div>
        <div class="flex-1 gap-[8px]">
          <span>Updated at</span> <span>{{ formatDate(todo.updated_at) }}</span>
        </div>
        <div class="flex-1 gap-[8px]">
          <div>
            <button><i class="ri-edit-box-line"></i></button>
            <button><i class="ri-delete-bin-line"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Tidak ada tugas untuk ditampilkan.</p>
    </div>
  </div>
  <div v-else>
    <p>Project tidak ditemukan.</p>
  </div>

  <!-- <div
    class="bg-[#000000B2] w-full h-full absolute inset-0 bg-opacity-80"
    :class="{ '': isOpen, hidden: !isOpen }"
    @click.self="isOpen = false"
  >
    <div
      class="bg-gray-200 h-full absolute rounded-[24px] right-0 top-1/2 transform -translate-y-1/2 p-4"
    >
      <div class="flex justify-between">
        <div><h1>Tambah project baru</h1></div>
        <div><button @click.self="isOpen = false">X</button></div>
      </div>

      <div class="py-2">
        <label
          for="namaProject"
          class="block mb-2 text-sm font-medium text-gray-900"
          >Nama nama project</label
        >
        <input
          type="text"
          id="namaProject"
          v-model="formData.description"
          placeholder="Masukan nama project"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5 pl-10 pr-[20px] py-2"
        />
      </div>
      <ButtonPrimary class="w-full" @click="submitProject"
        >Submit</ButtonPrimary
      >
    </div>
  </div> -->

  <Modal
    v-model="openModal1"
    title="Tambah to-do baru"
    submitLabel="Submit"
    @close="setModal"
    @submit="submitProject"
  >
    <div class="py-2">
      <label for="namalist" class="block mb-2 text-sm font-medium text-gray-900"
        >Nama list</label
      >
      <input
        type="text"
        id="namalist"
        v-model="formData.description"
        placeholder="Masukan nama list"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5 pl-10 pr-[20px] py-2"
      />
    </div>
  </Modal>

  <Modal v-model="openModal2" title="Modal 2" @submit="submitTeam">
    <label for="team" class="block mb-2 text-sm font-medium text-gray-900"
      >Email</label
    >
    <input
      type="text"
      id="team"
      v-model="formData.email"
      placeholder="Masukan nama list"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-blue-500 block w-full p-2.5 pl-10 pr-[20px] py-2"
    />
  </Modal>
</template>

<script>
import { usePeojectStore } from "@/stores/project.store.js";
import { useTodoStore } from "@/stores/todo.store.js";
import { useTeamStore } from "@/stores/team.store.js";

export default {
  props: ["id"], // Menerima id sebagai props
  data() {
    return {
      projectStore: usePeojectStore(),
      todoStore: useTodoStore(),
      teamStore: useTeamStore(),
      project: null,
      projectName: null,
      openModal1: false,
      openModal2: false,
      formData: {
        description: null,
        email: null,
        project_id: null,
      },
      formData2: {
        email: null,
        project_id: null,
      },
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
      },
    },
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
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleString("en-GB", options).replace(",", ""); // Format UK (DD/MM/YYYY HH:MM)
    },
    setModal() {
      this.isOpen = !this.isOpen;
      console.log(this.isOpen);
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
      if (!this.formData.description) {
        alert("Nama project tidak boleh kosong");
        return;
      }

      this.formData.project_id = this.project.id;
      try {
        await this.todoStore.add({
          project_id: this.formData.project_id,
          description: this.formData.description,
        });
        this.formData.description = null;
      } catch (error) {
        console.error("Gagal menambahkan project:", error);
      }
    },

    async submitTeam() {
      if (!this.formData.email) {
        alert("email project tidak boleh kosong");
        return;
      }

      this.formData.project_id = this.project.id;
      try {
        await this.teamStore.add({
          project_id: this.formData.project_id,
          email: this.formData.email,
        });
        this.formData.email = null;
      } catch (error) {
        console.error("Gagal menambahkan team:", error);
      }
    },
    showAlert() {
      this.$swal.fire({
        cancelButtonText: "Batal",
        confirmButtonText: "Keluar",
        
        showCancelButton: true,
        buttonsStyling: false,
        // showCloseButton: true,
        title: `Keluar dari Project ${this.project.name}?`,
        text: "Apa anda yakin ingin keluar dari project ini?",
        iconHtml: `
          <div class="border border-white rounded-full p-4 flex items-center justify-center">
              <i class="ri-logout-box-r-line text-white "></i>
          </div>
        `,
        customClass: {
          container: "!bg-[#000000B2] !p-[12px] bg-opacity-80 ",
          popup: "!flex flex-col p-[12px] ",
          icon: "bg-[#FB6056]  w-full rounded-2xl border-none py-16 mt-0",
          actions: "flex w-full justify-between space-x-3 p-3",
          confirmButton:
            "flex-grow bg-[#FB6056] p-2 rounded-md text-white hover:bg-[#E4574E]",
          cancelButton:
            "flex-grow bg-white text-[#FB6056] border border-[#FB6056] p-2 rounded-md",
        },

        preConfirm: () => {
          this.$router.push("/");
        },
      });
    },
  },
};
</script>

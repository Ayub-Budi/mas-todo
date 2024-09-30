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
      <div>
        <ButtonMinimal @click="activeTab = 'todo'">To-do list</ButtonMinimal>
        <ButtonMinimal @click="activeTab = 'personil'">Personil</ButtonMinimal>
      </div>
      
      <!-- todo -->
      <div v-if="activeTab === 'todo'">
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
              <strong>{{ todo.description }}</strong>
            </label>
          </div>
          <div class="flex-1 gap-[8px]">
            <span class="text-[#6E6E6E]">Created by</span> <strong>{{ todo.created_by }}</strong>
          </div>
          <div class="flex-1 gap-[8px]">
            <span class="text-[#6E6E6E]">Created at</span> <strong>{{ formatDate(todo.created_at) }}</strong>
          </div>
          <div class="flex-1 gap-[8px]">
            <span class="text-[#6E6E6E]">Updated at</span> <strong>{{ formatDate(todo.updated_at) }} </strong>
          </div>
          <div class="flex-2 gap-[8px]">
            <div class="">
              <button @click="openEditModal(todo)" class="bg-[#CCE5FE] rounded-[5px] p-[8px] mr-[4px]"><i class="ri-edit-box-line text-[#007DFC]"></i></button>
              <button @click="deleteTodo(todo)" class="bg-[#FEDFDD] rounded-[5px] p-[8px]"><i class="ri-delete-bin-line text-[#FB6056]"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Tidak ada tugas untuk ditampilkan.</p>
    </div>
    
    
    <div v-if="activeTab === 'personil'">
      <div class=" flex flex-row bg-[#F0F3FF] rounded-tl-[10px] rounded-tr-[10px] border">
        <div class="py-[18px] px-[20px]">#</div>
        <div class="flex-1 py-[18px] px-[20px]">Nama Personil</div>
        <div class="flex-1 py-[18px] px-[20px]">Email</div>
        <div class="flex-1 py-[18px] px-[20px]">No Telepon</div>
      </div>
      <div v-if="teamStore.teams && teamStore.teams.length > 0"> <!-- Tambahkan pengecekan ini -->
        <div v-for="member in teamStore.teams" :key="member.id" class=" flex flex-row pt-[6px] pb-[6px] border-r border-b border-l">
          <div class="py-[18px] px-[20px]">#</div>
          <div class="flex-1 py-[18px] px-[20px]"><strong>{{ member.name }}</strong></div>
          <div class="flex-1 py-[18px] px-[20px]"><span> {{ member.email }}</span> </div>
          <div class="flex-1 py-[18px] px-[20px]"><span>{{ member.phone_number }}</span></div>
        </div>
      </div>
      <div v-else>
        <p>Tidak ada anggota tim untuk ditampilkan.</p>
      </div>
    </div>

  </div>
  <div v-else>
    <p>Project tidak ditemukan.</p>
  </div>

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

  <Modal v-model="openModal2" title="Undang personil baru" @submit="submitTeam">
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

  <Modal v-model="openModal3" title="Update project" @submit="edit(todo)">
    <label for="editTodo" class="block mb-2 text-sm font-medium text-gray-900"
      >Nama nama project</label
    >
    <input
      type="text"
      id="editTodo"
      v-model="formData.description"
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
      activeTab: 'todo',
      projectName: null,
      openModal1: false,
      openModal2: false,
      openModal3: false,
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

      if (this.project) {
        this.teamStore.fetch(this.project.id).then(() => {
            console.log("Fetched teams:", this.teamStore.teams); // Log hasil fetch
        }).catch(err => {
            console.error("Fetch error:", err); // Log jika ada error
        });
        
      }

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

    openEditModal(todo) {
      this.selectedTodo = todo;
      this.formData.description = todo.description;
      this.formData.is_complete = todo.is_complete;

      this.openModal3 = true;
    },

    async edit() {
      try {
        if (!this.formData.description) {
          alert("Nama project tidak boleh kosong");
          return;
        }
        
        // Update data melalui store atau API
        await this.todoStore.update(this.selectedTodo.id, {
          description: this.formData.description,
          is_complete: this.formData.is_complete,
        });

        // Update nilai todo di frontend
        this.selectedTodo.description = this.formData.description;
        this.selectedTodo.is_complete = this.formData.is_complete;
        
        // Tutup modal
        this.openModal3 = false;
        
      } catch (error) {
        console.error("Failed to update todo:", error);
      }
    },

    async deleteTodo(todo) {
      try {
        await this.todoStore.delete(todo.id);
      } catch (error) {
        console.error("Failed to delete todo:", error);
      }
    },

    async leaveTeam() {
      try {
        await this.teamStore.delete(this.project.id);
      } catch (error) {
        console.error("Failed to delete todo:", error);
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
        reverseButtons: true,
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
      }).then((result) => {
        if (result.isConfirmed) {
          this.leaveTeam()
          this.$router.push("/");
        }
      });
    },
  },
};
</script>

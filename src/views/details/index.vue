<template>
  <div v-if="project">
    <div class="flex justify-between">
      <div>
        <h1 class="text-[24px] text-[#303030] font-bold">{{ project.name }}</h1>
      </div>
      <div class="flex gap-[10px]">
        <div>
          <ButtonPrimary :intent="'primary2'" @click="openModal1 = true">+ + Tambah to-do</ButtonPrimary>
        </div>
        <div>
          <ButtonPrimary :intent="'primary2'" @click="openModal2 = true">+ Undang personil</ButtonPrimary>
        </div>
        <div>
          <ButtonPrimary :intent="'primary4'" @click="showAlert">Keluar project</ButtonPrimary>
        </div>
      </div>
    </div>

    <div class="flex flex-col" v-if="project.todo && project.todo.length > 0">
      <div class="py-[16px]">
        <ButtonMinimal @click="activeTab = 'todo'">To-do list</ButtonMinimal>
        <ButtonMinimal @click="activeTab = 'personil'">Personil</ButtonMinimal>
      </div>
      
      <!-- todo -->
      <div v-if="activeTab === 'todo'" class="border rounded-[10px]">
        <CardDetailTodo v-for="todo in project.todo" :key="todo.id" :todo="todo" v-on:todoValue="toggleComplete" v-on:openModal="openEditModal" v-on:deletetodo="deleteTodo"></CardDetailTodo>
      </div>
    </div>
    <div v-else>
      <p>Tidak ada tugas untuk ditampilkan.</p>
    </div>
    <div v-if="activeTab === 'personil'">
      <CardDetailPersonil :members="teamStore.teams"> </CardDetailPersonil>
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
      <InputPrimary v-model="formData.description" type="text" id="namalist" placeholder="Masukan nama list" :intent="'primary2'" required></InputPrimary>
    </div>
  </Modal>

  <Modal v-model="openModal2" title="Undang personil baru" @submit="submitTeam">
    <label for="team" class="block mb-2 text-sm font-medium text-gray-900"
      >Email</label
    >
    <InputPrimary v-model="formData.email" type="text" id="team" placeholder="Masukan mail" :intent="'primary2'" required></InputPrimary>
  </Modal>

  <Modal v-model="openModal3" title="Update project" @submit="edit(todo)">
    <label for="editTodo" class="block mb-2 text-sm font-medium text-gray-900"
      >Nama nama project</label
    >
    <InputPrimary v-model="formData.description" type="text" id="editTodo" placeholder="Masukan nama list" :intent="'primary2'" required></InputPrimary>

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
        html: `<p class=" text-[14px] !text-left">Apa anda yakin ingin keluar dari project ini?<p>`,
        // text: "Apa anda yakin ingin keluar dari project ini?",
        iconHtml: `
          <div class="border border-white rounded-full p-4 flex items-center justify-center">
              <i class="ri-logout-box-r-line text-white "></i>
          </div>
        `,
        customClass: {
          container: "!bg-[#000000B2] !p-[12px] bg-opacity-80 ",
          popup: "!flex flex-col p-[12px] ",
          icon: "bg-[#FB6056]  w-full rounded-2xl border-none py-16 mt-0",
          title: "p-0 text-left text-[21px]",
          htmlContainer: 'text-left text-sm !m-0 p-0 ',
          text: "m-0",
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

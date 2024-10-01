<template>
  <div class="border flex flex-warp flex-col rounded-[24px] py-6 gap-4">
    <div class="flex-1 px-4">
      <h2 class="text-[18px] font-bold">{{ project.name }}</h2>

      <div class="mt-4">
        <div class="w-full h-[10px] bg-gray-200 rounded-[10px]">
          <div
            class="h-[10px] bg-blue-600 rounded-[10px]"
            :style="{ width: projectCompletionPercentage(project) + '%' }"
          ></div>
        </div>

        <div class="flex justify-between">
          <div>
            <p class="mt-2 text-[12px]" :class="{
                'text-[#06BD80]': projectStatus(project) === 'Selesai',
                'text-[#D8852D]': projectStatus(project) === 'Belum Selesai'
              }"> 
              <span
                :class="{
                  'bg-[#06BD80]': projectStatus(project) === 'Selesai',
                  'bg-[#D8852D]': projectStatus(project) === 'Belum Selesai'
                }"
                class="inline-block w-2 h-2 rounded-full mr-2"
              ></span> {{ projectStatus(project) }}
            </p>
          </div>
          <div>
            <p class="text-sm mt-2 text-[#303030] text-[12px]">
              {{ completedTodos(project) }}/{{ totalTodos(project) }} Selesai
            </p>
          </div>
        </div>
      </div>
    </div>
    <span class="border-t-2 w-full"></span>
    <div class="flex-1 px-4">
      <div v-for="todo in project.todo.slice(0, 3)" :key="todo.id" class="mt-2">
        <CheckBook :title="todo.description" :checked="todo.is_complete" @change="toggleComplete(todo)"></CheckBook>
        <!-- <input
          type="checkbox"
          :checked="todo.is_complete"
          @change="toggleComplete(todo)"
          class="mr-2 w-4 h-4 accent-[#007DFC]"
        />
        <label class="text-[14px] text-[#303030] font-medium">
          {{ todo.description }}
        </label> -->
      </div>
    </div>
    <div class="shrink-0 flex px-4">
      <ButtonPrimary
        class="flex-1"
        :intent="'primary3'"
        @click="$router.push({ name: 'ProjectDetail', params: { id: project.id } })"
      >
        Lihat semua
      </ButtonPrimary>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  methods: {
    projectCompletionPercentage(project) {
      return (this.completedTodos(project) / this.totalTodos(project)) * 100;
    },
    projectStatus(project) {
      return this.completedTodos(project) === this.totalTodos(project) ? 'Selesai' : 'Belum Selesai';
    },
    completedTodos(project) {
      return project.todo.filter(todo => todo.is_complete).length;
    },
    totalTodos(project) {
      return project.todo.length;
    },
    toggleComplete(todo) {
      this.$emit('todoValue', todo)
    },
  },
};
</script>

<template>
    <div class="flex-1 flex flex-row items-center space-x-4 px-[18px] py-[20px] border-t-2">
      <div class="flex-1">
        <CheckBook
          :title="todo.description"
          :checked="todo.is_complete"
          @change="toggleComplete(todo)"
        ></CheckBook>
      </div>
      <div class="flex-1 gap-[8px]">
        <p class="text-[#6E6E6E] text-[14px] font-medium">
          Created by
          <span class="text-[#303030] text-[14px] font-bold">{{ todo.created_by }}</span>
        </p>
      </div>
      <div class="flex-1 gap-[8px]">
        <p class="text-[#6E6E6E] text-[14px] font-medium">
          Created at
          <span class="text-[#303030] text-[14px] font-bold">{{ formatDate(todo.created_at) }}</span>
        </p>
      </div>
      <div class="flex-1 gap-[8px]">
        <p class="text-[#6E6E6E] text-[14px] font-medium">
          Updated at
          <span class="text-[#303030] text-[14px] font-bold">{{ formatDate(todo.updated_at) }}</span>
        </p>
      </div>
      <div class="gap-[8px]">
        <div>
          <button @click="openEditModal(todo)" class="bg-[#CCE5FE] rounded-[5px] p-[8px] mr-[4px] gap-[10px]">
            <i class="ri-edit-box-line text-[#007DFC]"></i>
          </button>
          <button @click="deleteTodo(todo)" class="bg-[#FEDFDD] rounded-[5px] p-[8px]">
            <i class="ri-delete-bin-line text-[#FB6056]"></i>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      todo: {
        type: Object,
        required: true,
      },
    },
    methods: {
      toggleComplete(todo) {
        this.$emit('todoValue', todo);
      },
      openEditModal(todo) {
        this.$emit('openModal', todo);
      },
      deleteTodo(todo) {
        this.$emit('deletetodo', todo);
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString(); 
      },
    },
  };
  </script>
  
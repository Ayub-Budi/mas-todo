<template>
    <div v-if="members.length > 0">
      <div class="flex flex-row bg-[#F0F3FF] rounded-tl-[10px] rounded-tr-[10px] border">
        <div class="py-[18px] px-[20px]">#</div>
        <div class="flex-1 text-[14px] text-[#303030] font-bold py-[18px] px-[20px]">Nama Personil</div>
        <div class="flex-1 text-[14px] text-[#303030] font-bold py-[18px] px-[20px]">Email</div>
        <div class="flex-1 text-[14px] text-[#303030] font-bold py-[18px] px-[20px]">No Telepon</div>
      </div>
      
      <div v-for="(member, index) in members" :key="member.id" class="flex flex-row pt-[6px] pb-[6px] border-r border-b border-l">
        <div class="text-[14px] text-[#6E6E6E] font-medium py-[18px] px-[20px]">{{ index + 1 }}</div>
        <div class="flex-1 text-[14px] text-[#303030] font-bold py-[18px] px-[20px]">
          <strong>{{ member.name }}</strong>
        </div>
        <div class="flex-1 text-[14px] text-[#6E6E6E] font-medium py-[18px] px-[20px]">
          <span>{{ member.email }}</span>
        </div>
        <div class="flex-1 text-[14px] text-[#6E6E6E] font-medium py-[18px] px-[20px]">
          <span>{{ member.phone_number }}</span>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Tidak ada anggota tim untuk ditampilkan.</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      members: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  
<template>
  <button
    :class="customButton"
    :type="type"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "button",
    },
    intent: {
      type: String,
      default: "primary",
    },
  },
  computed: {
    customButton() {
      const baseClass = "bg-[#007DFC] text-white hover:bg-[#0071E3]";
      const variantClass = {
        primary: "rounded-[16px] text-[14px] py-[16px] px-[20px]",
        primary2: "rounded-[14px] text-[14px] py-[14px] px-[32px] gap-[6px]",
        primary3: "rounded-[14px] text-[14px] py-[12px] px-[16px] gap-[6px]",
        primary4: "rounded-[14px] text-[14px] py-[14px] px-[32px] gap-[6px] !bg-[#E4574E] !hover:bg-[#B2443D]",

      };
      return `${baseClass} ${variantClass[this.intent]}`;
    },
  },
};
</script>

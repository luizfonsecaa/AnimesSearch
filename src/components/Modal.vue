<template>
  <div
    v-if="modal"
    class="h-screen w-screen absolute bg-black bg-opacity-70 z-50 flex justify-center items-center"
  >
    <div class="h-2/3 w-2/3 bg-white rounded-lg relative">
      <span
        @click="closeModal()"
        class="absolute flex text-gray-500 cursor-pointer justify-center items-center -right-4 -top-4 text-lg bg-white rounded-full w-10 h-10"
        >x</span
      >
      <div class="flex p-3 h-full">
        <div class="w-full flex justify-center items-center">
          <img :src="anime.image_url" alt="" />
        </div>
        <div class="h-full flex flex-col justify-center">
          <h1 class="text-3xl">{{ anime.title }}</h1>
          <p class="text-lg">{{ anime.episodes }}</p>
          <p class="text-xl">{{ anime.synopsis }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutComponent',
  props: {
    modal: {
      type: Boolean,
      default: false,
    },
    anime: {
      type: Object,
    },
  },

  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },
  },
}
</script>

<style></style>

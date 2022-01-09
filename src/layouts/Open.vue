<template>
  <div class="h-screen w-screen" v-if="modalMic">
    <div @click="closeModal" class="absolute right-0 mr-2 mt-2 cursor-pointer">X</div>
    <div class="container mx-auto flex justify-center items-center h-full">
      <p class="text-5xl text-gray-500 w-1/2 font-light mr-5 capitalize">{{ mic }}</p>
      <button class="p-7 rounded-full shadow-xl animate-pulse bg-gray-100">
        <img src="../assets/microfone.png" alt="" />
      </button>
    </div>
  </div>
  <Header />
  <router-view />
</template>

<script>
import axios from 'axios'
import Header from '../components/Header.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'LayoutPage',
  components: {
    Header,
  },

  computed: {
    ...mapGetters({
      modalMic: 'animes/modalMic',
      mic: 'animes/mic',
    }),
  },

  methods: {
    closeModal() {
      this.$store.dispatch('animes/SET_MODAL_MIC', [false])
    },
  },
}
</script>

<style></style>

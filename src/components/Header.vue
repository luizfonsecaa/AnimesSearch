<template>
  <div
    class="absolute flex w-screen items-center px-5 py-1"
    :class="isPage ? 'justify-between' : 'justify-end'"
  >
    <div class="logo two-colors text-lg cursor-pointer" @click="goHome()" v-if="isPage">
      Anime frends
    </div>
    <div class="flex items-center">
      <span>{{ user.name }}</span>
      <img class="rounded-full h-10 ml-2" :src="user.image" alt="" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HeaderComponent',
  data() {
    return {
      user: {
        name: '',
        image: '',
      },
    }
  },
  computed: {
    isPage() {
      if (this.$route.name === 'Home') return false
      else return true
    },
  },
  methods: {
    async setUser() {
      try {
        const response = await axios.get(`https://randomuser.me/api/`)
        this.user.name = response.data.results[0].name.first
        this.user.image = response.data.results[0].picture.thumbnail
      } catch (error) {}
    },

    goHome() {
      this.$store.dispatch('animes/SET_SEARCH', [''])
      this.$router.push('/')
    },
  },
  created() {
    this.setUser()
  },
}
</script>

<style></style>

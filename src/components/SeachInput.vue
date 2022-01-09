<template>
  <div class="w-full border border-gray-600 rounded-3xl p-2 bg-white">
    <div class="flex w-full justify-between items-center">
      <img class="pr-2 h-5" src="../assets/search.svg" alt="" />
      <input
        v-model="text"
        v-debounce:1s="search"
        debounce-events="input"
        @keyup.enter="getData('reset')"
        @focus="search"
        class="w-full bg-transparent outline-0"
      />
      <Mic />
    </div>
    <hr class="my-1 h-1" v-if="this.resultSearch.length > 0" />
    <div v-if="this.resultSearch.length > 0">
      <ul class="w-full" v-for="anime in resultSearch" :key="anime.mal_id">
        <li class="w-full mb-2 cursor-pointer hover:bg-gray-100" @click="getData('reset')">
          <div class="flex w-full">
            <img :src="anime.image_url" alt="" class="h-16 rounded-md pr-1" />
            <div class="grow">
              <div>
                <span class="font-medium text-lg text-gray-700">{{ anime.title }}</span>
              </div>
              <div class="flex items-center text-gray-700">
                <p class="mr-2 text-xs">
                  <span class="font-medium">tipe:</span>
                  <span>{{ anime.type }}</span>
                </p>
                <p class="text-xs">
                  <span class="font-medium">EP:</span>
                  <span>{{ anime.episodes }}</span>
                </p>
              </div>
              <div class="flex items-center justify-between text-gray-700 w-full">
                <p class="text-xs mr-2">
                  <span class="font-medium">Score:</span>
                  <span>{{ anime.score }}</span>
                </p>
                <p class="text-xs">
                  <span
                    >{{ formatedDate(anime.start_date) }} - {{ formatedDate(anime.end_date) }}</span
                  >
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="mt-2 flex justify-center" v-if="this.resultSearch.length > 0">
      <button class="bg-gray-200 py-1 mr-2 rounded-md w-36" @click="getData('reset')">
        Pesquisar
      </button>
      <!-- <button class="bg-gray-200 py-1 rounded-md w-36">Anime Aleatorio</button> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import { mapGetters } from 'vuex'
import Mic from '../components/Mic.vue'
export default {
  name: 'SeachComponent',
  props: {
    page: {
      type: Number,
      default: 1,
    },
  },
  components: {
    Mic,
  },
  data() {
    return {
      resultSearch: [],
      data: [],
    }
  },
  computed: {
    ...mapGetters({
      inputSearch: 'animes/inputSearch',
    }),

    text: {
      // getter
      get: function () {
        return this.inputSearch
      },
      // setter
      set: function (newValue) {
        this.$store.dispatch('animes/SET_SEARCH', [newValue])
      },
    },
  },
  methods: {
    async search() {
      try {
        if (this.text.length === 0) {
          this.resultSearch = []
          this.data = []
        } else {
          const response = await axios.get(
            `https://api.jikan.moe/v3/search/anime?q=${this.text}&limit=10&page=${this.page}&order_by=score&sort=desc`
          )
          this.resultSearch = []
          if (response.data.results) this.resultSearch = response.data.results.slice(0, 5)

          this.data = response.data.results
        }
      } catch (error) {
        this.resultSearch = []
      }
    },

    getData(value) {
      this.$store.dispatch('animes/SET_ANIMES', [this.data, value])
      this.resultSearch = []
      if (this.$route.name !== 'Search') this.$router.push('/search')
    },
    formatedDate(value) {
      if (value) return moment(String(value)).format('MM/DD/YYYY')
      else return ''
    },
  },
  watch: {
    page: async function (val) {
      await this.search()
      this.getData()
    },
  },
}
</script>

<style></style>

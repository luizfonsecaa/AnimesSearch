<template>
  <Modal :modal="modal" :anime="anime" @closeModal="closeModal" />

  <div class="pt-28">
    <div class="container mx-auto">
      <div class="flex justify-center items-center w-full relative">
        <div class="w-full px-2 md:w-1/2 md:p-0 absolute" style="top: -38px">
          <SearchInput :page="page" />
        </div>
      </div>
      <hr class="my-5" />
      <div
        class="mb-5 cursor-pointer px-2 md:px-0"
        v-for="anime in animes"
        :key="anime.mal_id"
        @click="openAnime(anime)"
      >
        <a class="text-xs" :href="anime.url">{{ anime.url }}</a>
        <p class="text-2xl font-medium">{{ anime.title }}</p>
        <p>
          {{ anime.synopsis }}
        </p>
        <div class="flex">
          <star-rating :show-rating="false" :star-size="15" v-model:rating="anime.score" />
          &nbsp;Avaliação: {{ anime.score }} - {{ anime.episodes }} episodios
          {{ formatedDate(anime.start_date) }} - {{ formatedDate(anime.end_date) }}
        </div>
        <hr class="my-1" />
      </div>
      <div class="flex justify-center mt-10" v-if="this.animes.length === 0">
        <h1 class="text-md md:text-lg text-center">
          Your research do not found any corresponding document
        </h1>
      </div>
      <div class="my-2 flex justify-center" v-if="this.animes.length > 0">
        <button class="bg-gray-200 py-1 mr-2 rounded-md w-36" @click="page++">More results</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import StarRating from 'vue-star-rating'
import SearchInput from '../components/SeachInput.vue'
import Modal from '../components/Modal.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'SearchPage',
  components: {
    SearchInput,
    StarRating,
    Modal,
  },
  data() {
    return {
      modal: false,
      page: 1,
      anime: { title: '', episodes: '', image_url: '', synopsis: '' },
    }
  },
  computed: {
    ...mapGetters({
      animes: 'animes/animes',
    }),
  },
  methods: {
    formatedDate(value) {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
      } else return ''
    },
    openAnime(value) {
      window.scrollTo(0, 0)
      document.documentElement.style.overflow = 'hidden'
      this.anime = value
      this.modal = true
    },
    closeModal() {
      this.modal = false
      document.documentElement.style.overflow = 'auto'
    },
  },
}
</script>

<style></style>

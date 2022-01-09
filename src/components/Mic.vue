<template>
  <button @click="getbutton" class="w-6">
    <img src="../assets/microfone.png" alt="" />
  </button>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  name: 'MicComonent',
  data() {
    return {
      listening: false,
    }
  },
  computed: {
    ...mapGetters({
      mic: 'animes/mic',
    }),
  },
  methods: {
    createRecognition() {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null

      if (!recognition) {
        console.log('is not found')
        return
      }

      recognition.lang = 'pt_BR'

      recognition.onstart = () => {
        this.$store.dispatch('animes/SET_MIC', ['ouvindo...'])
        this.$store.dispatch('animes/SET_MODAL_MIC', [true])
        document.documentElement.style.overflow = 'hidden'
        this.listening = true
      }

      recognition.onend = async () => {
        try {
          document.documentElement.style.overflow = 'auto'
          this.$store.dispatch('animes/SET_SEARCH', [this.mic])

          const response = await axios.get(
            `https://api.jikan.moe/v3/search/anime?q=${
              this.mic
            }&limit=10&page=${1}&order_by=score&sort=desc`
          )

          this.$store.dispatch('animes/SET_ANIMES', [response.data.results, 'reset'])
          this.$store.dispatch('animes/SET_MODAL_MIC', [false])
          if (this.$route.name !== 'Search') this.$router.push('/search')
          this.listening = false
        } catch (error) {
          document.documentElement.style.overflow = 'auto'
          this.$store.dispatch('animes/SET_MODAL_MIC', [false])
          this.listening = false
        }
      }

      recognition.onerror = (e) => console.log('error: ', e)

      recognition.onresult = (e) => {
        this.$store.dispatch('animes/SET_MIC', [e.results[0][0].transcript])
      }

      return recognition
    },

    getbutton() {
      let recognition = this.createRecognition()
      if (!recognition) return
      recognition.start()

      this.listening ? recognition.stop() : recognition.start()
    },
  },
  created() {
    this.createRecognition()
  },
}
</script>
<style></style>

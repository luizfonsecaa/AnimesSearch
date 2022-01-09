import { createStore } from 'vuex'
import animes from '../store/modules/animes'

const store = createStore({
  modules: {
    animes,
  },
})

export default store
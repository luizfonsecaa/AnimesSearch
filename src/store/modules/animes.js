
const state = {
  animes: [],
  inputSearch: '',
  modalMic: false,
  mic: ''
}

const actions = {
  SET_ANIMES({ commit }, [animes, value]) {
    commit('SAVE_ANIMES', [animes, value])
  },

  SET_SEARCH({ commit }, [value]) {
    commit('SAVE_SEARCH', [value])
  },

  SET_MODAL_MIC({ commit }, [value]) {
    commit('SAVE_MODAL_MIC', [value])
  },

  SET_MIC({ commit }, [value]) {
    commit('SAVE_MIC', [value])
  },
}

const mutations = {
  SAVE_ANIMES(state, [animes, value]) {
    if (value === 'reset') state.animes = animes
    else state.animes = state.animes.concat(animes)
  },

  SAVE_SEARCH(state, [value]) {
    state.inputSearch = value
  },

  SAVE_MODAL_MIC(state, [value]) {
    state.modalMic = value
  },

  SAVE_MIC(state, [value]) {
    state.mic = value
  },
}

const getters = {
  animes: state => {
    return state.animes
  },

  inputSearch: state => {
    return state.inputSearch
  },

  modalMic: state => {
    return state.modalMic
  },

  mic: state => {
    return state.mic
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

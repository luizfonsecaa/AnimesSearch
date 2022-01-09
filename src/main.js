import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueDebounce from 'vue-debounce'

import './index.css'
createApp(App)
  .use(router)
  .use(store)
  .use(vueDebounce)
  .mount('#app')
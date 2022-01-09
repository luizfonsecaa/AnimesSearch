import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/Open.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../pages/Home.vue'),
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('../pages/Search.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

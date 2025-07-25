import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/', component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/IndexPage.vue')
      },
      {
        path: '/data', component: () => import('pages/Data/IndexPage.vue'),
        children: [
          {
            path: '', redirect: '/data/sentences'
          },
          {
            path: 'sentences', component: () => import('pages/Data/SentencesPage.vue')
          }, {
            path: 'lessons', component: () => import('pages/Data/LessonsPage.vue')
          }
        ]
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', 
        component: () => import(/* webpackChunkName: "Home" */ '../modules/pokemon/pages/HomePage')
    },
    { path: '/buscador', 
    component: () => import(/* webpackChunkName: "SearchPage" */ '../modules/pokemon/pages/SearchPage') 
    },
    { path: '/:pathMatch(.*)*', component: '/'  }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;
  
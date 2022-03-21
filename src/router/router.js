import { createRouter, createWebHashHistory } from 'vue-router'
import NoPageFound from '../modules/pokemon/pages/components/NoPageFound'
const routes = [
    { path: '/', 
        component: () => import(/* webpackChunkName: "Home" */ '../modules/pokemon/pages/HomePage')
    },
    { path: '/buscador', 
    component: () => import(/* webpackChunkName: "SearchPage" */ '../modules/pokemon/pages/SearchPage') 
    },
    { path: '/:pathMatch(.*)*',
    component: NoPageFound  }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;
  
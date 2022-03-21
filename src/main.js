import { createApp } from 'vue'
import App from './App.vue'
// Router
import router from './router/router'
//css general
import ('./css/styles.css');
import Toaster from "@incuca/vue3-toaster";
createApp(App).use(router).use(Toaster).mount('#app')

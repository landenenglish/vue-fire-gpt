import '@/style/style.scss'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from '@/App.vue'
import PrimeVue from 'primevue/config'
import Theme from '@/presets/aura'

const app = createApp(App)
app.use(createRouter({ history: createWebHistory(), routes }))
app.use(PrimeVue, { unstyled: true, pt: Theme })
app.mount('#app')

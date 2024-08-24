import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import { router } from '@/router'
import PrimeVue from 'primevue/config'
import Theme from '@/presets/aura'

const app = createApp(App)

app.use(router)

app.use(PrimeVue, {
  unstyled: true,
  pt: Theme,
})

app.mount('#app')

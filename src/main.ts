import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPersistedstate from 'pinia-plugin-persistedstate'
import vuetify from './plugins/vuetify'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersistedstate)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.mount('#app')

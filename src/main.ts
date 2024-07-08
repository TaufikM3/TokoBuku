
import { createApp } from 'vue'


import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';

import { createPinia } from 'pinia'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import primevue from 'primevue/config'




import 'primeicons/primeicons.css'
import'/node_modules/primeflex/primeflex.css/'



const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)
const pinia = createPinia()


app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(primevue)
app.use('InputText',InputText)
app.use('Dialog', Dialog)
app.use('Button',Button)


app.mount('#app')

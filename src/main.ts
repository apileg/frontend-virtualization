import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { clickOutside } from './directives/clickOutside'

const app = createApp(App).directive('click-outside', clickOutside)

app.mount('#app')

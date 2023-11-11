import { createApp } from 'vue'
import MyComponent from '../src/index'
import './main.css'
import 'virtual:uno.css'
import App from './App.vue'

createApp(App).use(MyComponent).mount('#app')

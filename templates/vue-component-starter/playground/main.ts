import { createApp } from 'vue'
import MyComponent from '../src/index'
import App from './App.vue'
import './main.css'
import 'virtual:uno.css'

createApp(App).use(MyComponent).mount('#app')

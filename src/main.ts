import { createApp } from 'vue'
import './style.css'
import './styles/tailwind.css'
import ElementPlus from 'element-plus'
import * as icons from '@ez-ui/icons'
import 'element-plus/dist/index.css'
import 'ez-ui/dist/style.css'
import { InstallCodemirro } from "codemirror-editor-vue3";
import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus)
for (const [key, component] of Object.entries(icons)) {
  app.component(key, component)
}
app.use(InstallCodemirro);
app.mount('#app')

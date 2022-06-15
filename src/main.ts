import { createApp } from 'vue'
import App from './App.vue'
import plugin, {VueLoadingIndicatorConfig} from "./index";

// Init app
const app = createApp(App)

app.use(plugin, {
    timeGap: 400,
    autoFinish: true
} as Partial<VueLoadingIndicatorConfig>)

app.mount('#app')

window.$vue = app

export default app

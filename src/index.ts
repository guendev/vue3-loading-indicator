// Component
import VueProcessBar from "./components/VueProcessBar.vue"

// Loading plugin
import plugin from "./plugin"

// composable
import {useProcessBar} from "./composable"

export default plugin

export {
    VueProcessBar,
    useProcessBar
}

// Component
import VueLoadingIndicator from "./components/VueLoadingIndicator.vue"

// Loading plugin
import plugin from "./plugin"

// composable
import {useProcessBar} from "./composable"

export default plugin

export {
    VueLoadingIndicator,
    useProcessBar
}

export * from './types'

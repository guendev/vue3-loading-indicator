// Component
import VueLoadingIndicator from "./components/VueLoadingIndicator.vue"

// Loading plugin
import plugin from "./plugin"

// composable
import {useLoadingIndicator} from "./composable"

export default plugin

export {
    VueLoadingIndicator,
    useLoadingIndicator
}

export * from './types'

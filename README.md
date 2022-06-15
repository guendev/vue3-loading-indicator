# Vue 3 Loading Indicator

Did you use nuxtjs before?. If so, you can use the following loading indicator: [doc](https://nuxtjs.org/docs/features/loading/).\
This library inspired by Nuxt Loading will bring a loading indicator to your application.

## Installation
```
npm i @nguyenshort/vue3-loading-indicator
```

## Initialization
```ts
// main.ts, main.js
import Vue from "vue";
import VueLoadingIndicator from '@nguyenshort/vue3-loading-indicator'

const app = createApp(App)

app.use(VueLoadingIndicator, {
    /* option */
    color?: string
    errorColor?: string
    duration?: number
    timeGap?: number
    throttle?: number
    skipDuplicate?: boolean
    autoFinish?: boolean
    delay?: number
})
```

## Usage
### Setup component
Don't use component inside the router-vue

```vue
<template>
  <!-- Your content -->
  <router-view></router-view>
  
  <!-- Your loading indicator -->
  <vue-loading-indicator />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FooApp'
})
</script>
```
### Loading Indicator Instance
To access the loading indicator instance, use the `$loading` property or inject it into your component.

#### Option API
```ts
export default defineComponent({
  name: 'BarPage',
    methods: {
      
        showLoading() {
            this.$loading.start()
            setTimeout(() => {
                this.$loading.finish()
            }, 3000)
        }
        
    }
})
```

#### Component API
```ts
import { useLoadingIndicator } from '@nguyenshort/vue3-loading-indicator'

const $loading = useLoadingIndicator() // VueLoadingIndicatorInstance
```

#### Axios Loading Indicator
If you want to use Vue Loading Indicator in axios, or plugins..., you can use the following code:

```ts
// main.ts, main.js
const app = createApp(App)

app.use(VueLoadingIndicator, {/* option */ })
// use apollo plugin after VueLoadingIndicator
app.use(apollo)

// in apollo plugin
const plugin = {
    install(app: App) {
        // VueLoadingIndicatorInstance
        const $loading = app.config.globalProperties.$loading

        const http = axios.create({
            // Options
        })

        http.interceptors.request.use(
            (config) => {
                // Start loading
                $loading?.start()
                return config
            },
            (error) => {
                console.log(error) // for debug
                Promise.reject(error)
            }
        )

        app.provide<AxiosInstance>('$axios', http)
        app.config.globalProperties.$axios = http
    }
}

```

#### Apollo Loading Indicator
For Apollo, you can use the following code:
```ts
const plugin = {
    install(app: App) {
        // VueLoadingIndicatorInstance
        app.provide(ApolloClients, {
            default: () => {

                const roundTripLink = new ApolloLink((operation, forward) => {
                    // Start the loading indicator
                    $loading?.start()

                    return forward(operation).map((data) => {
                        if (data.errors) {
                            // Show error loading indicator
                            $loading?.fail()
                        } else {
                            // Stop the loading indicator
                            $loading?.finish()
                        }
                        return data
                    })
                })

                return new ApolloClient({
                    link: roundTripLink.concat(/* others link */),
                    // some other options
                })
            }
        })
    }
}
```
### Methods
| Method     | Params    | Description         |
|------------|-----------|---------------------|
| start()    | (options) | Start loading       |
| finish()   |           | Finish loading      |
| fail()     |           | Show error loading  |
| pause()    |           | Pause loading       |
| continue() |           | Continue loading    |
| clear()    |           | Clear loading       |
| set        | (num)     | Set loading options |
| inc        | (num)     | Inc loading process |
| dec        | (num)     | Dec loading process |


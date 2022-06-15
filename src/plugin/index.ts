import type { App } from 'vue'
import {VueLoadingIndicatorConfig, VueLoadingIndicatorState, VueLoadingIndicatorInstance} from "../index"
import {reactive} from "vue"
import {VueLoadingIndicator} from "../index";

// Custom type
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $loading: VueLoadingIndicatorInstance
    }
}


const plugin = {
    install(app: App, options?: Partial<VueLoadingIndicatorConfig>) {

        let DEFAULT_CONFIG = {
            color: '#3b66f5',
            errorColor: '#d50000',
            duration: 200,
            timeGap: 100,
            throttle: 2,
            skipDuplicate: true,
            autoFinish: true,
            delay: 800
        }
        const CONFIG = Object.assign({}, DEFAULT_CONFIG, options)
        const state: VueLoadingIndicatorState = {
            color: CONFIG.color,
            process: 0,
            type: 'normal',
            show: false
        }

        const instance: VueLoadingIndicatorInstance = reactive<VueLoadingIndicatorInstance>({
            config: CONFIG,
            state,
            start(options) {
                // merge optional options
                if(options) {
                    Object.assign(this.config, options)
                    this.state.color = this.config.color
                }
                if(this.config.skipDuplicate && this.state.show) {
                    // other running
                    return
                } else if (this.state.show) {
                    // other running but skip !skipDuplicate
                    // => clear old
                    this.clear()
                }
                this.state.show = true
                // Show method
                // Play process bar
                this.continue()
            },
            finish() {
                if(!this.state.show) {
                    // just stop, nothing else
                    return
                }
                clearInterval(this.state.timer)
                // upto 100% and clear
                this.state.process = 100
                if(this.config.autoFinish) {
                    setTimeout(() => {
                        this.clear()
                    }, this.config.duration + this.config.delay)
                }
            },
            fail() {
                this.state.color = this.config.errorColor
                // showing...just change color
                this.finish()
            },
            pause() {
                clearInterval(this.state.timer)
            },
            continue() {
                this.state.timer = setInterval(() => {
                    this.increase(10)
                    // upto 100%
                    if(this.state.process >= 100) {
                        // autoFinish => clear
                        if(this.config.autoFinish) {
                            this.finish()
                        } else {
                            // Just top clearInterval
                            clearInterval(this.state.timer)
                        }

                    }
                }, this.config.timeGap)
            },
            clear() {
                this.state.show = false
                clearInterval(this.state.timer)
                this.state.timer = null
                this.state.process = 0
                // reset config, data
                Object.assign(this.config, CONFIG)
                this.state.color = this.config.color
            },
            set(process: number) {
                this.state.process = process
            },
            increase(amount) {
                if(this.state.process + amount > 100) {
                    this.set(100)
                } else {
                   this.set(this.state.process + amount)
                }
            },
            decrease(amount: number) {
                if(this.state.process - amount < 0) {
                    this.set(0)
                } else {
                    this.set(this.state.process - amount)
                }
            }
        })

        app.provide('$loading', instance)
        app.component('VueLoadingIndicator', VueLoadingIndicator)
        app.config.globalProperties.$loading = instance
    }
}

export default plugin

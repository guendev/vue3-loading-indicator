import type { App } from 'vue'
import {IProcessBarConfig, IProcessBarState, VueProcessBar} from "../types"
import {reactive} from "vue"

// Custom type
declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $process: VueProcessBar
    }
}


const plugin = {
    install(app: App, options?: Partial<IProcessBarConfig>) {

        let DEFAULT_CONFIG = {
            position: 'top',
            color: '#3b66f5',
            errorColor: 'd50000',
            timeGap: 100,
            throttle: 2,
            duration: 300,
            skipDuplicate: false,
            autoFinish: false
        }
        const config = Object.assign({}, DEFAULT_CONFIG, options)
        const state: IProcessBarState = {
            color: config.color,
            process: 0,
            type: 'normal',
            show: false
        }

        const instance: VueProcessBar = reactive<VueProcessBar>({
            config,
            state,
            start(skipDuplicate) {
                // Merge custom config
                if(skipDuplicate && this.state.show) {
                    // other running
                    if(this.state.process >= 100) {
                        this.clear()
                    } else {
                        return
                    }
                } else if (this.state.show) {
                    // other running but skip !skipDuplicate
                    // => clear old
                    this.clear()
                }
                this.state.show = true
                // Show method
                // Play process bar
                this.state.timer = setInterval(() => {
                    this.state.process += 10
                    // upto 100%
                    if(this.state.process >= 100) {
                        // autoFinish => clear
                        if(this.config.autoFinish) {
                            this.clear()
                        } else {
                            // Just top clearInterval
                            clearInterval(this.state.timer)
                        }

                    }
                }, this.config.timeGap)
            },
            finish() {
                if(!this.state.show) {
                    // just stop, nothing else
                    return
                }
                clearInterval(this.state.timer)
                // upto 100% and clear
                this.state.process = 100 - this.state.process
                this.clear()
            },
            fail(skipDuplicate) {
                this.state.color = this.config.errorColor

                // showing...just change color
                if(this.state.show) {
                    return
                }

                this.start(skipDuplicate)
            },
            clear() {
                this.state.show = false
                clearInterval(this.state.timer)
                this.state.timer = null
                this.state.process = 0
                // reset color
                this.state.color = this.config.color
            }
        })

        app.provide('$process', instance)
        app.config.globalProperties.$process = instance
    }
}

export default plugin

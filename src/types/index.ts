export interface VueLoadingIndicatorConfig {
    color: string
    errorColor: string
    duration: number
    timeGap: number
    throttle: number
    skipDuplicate: boolean
    autoFinish: boolean
    delay: number
}

export interface VueLoadingIndicatorState {
    process: number
    type: 'normal' | 'fail'
    color: string
    timer?: any
    show: boolean
}

export interface LoadingIndicatorMethods {
    // Control method
    start(options?: Partial<VueLoadingIndicatorConfig>): void
    finish(): void
    fail(): void
    pause(): void
    continue(): void
    clear(): void

    // Value method
    set(process: number): void
    increase(amount: number): void
    decrease(amount: number): void
}

export interface LoadingIndicatorInstance extends LoadingIndicatorMethods {
    config: VueLoadingIndicatorConfig
    state: VueLoadingIndicatorState
}

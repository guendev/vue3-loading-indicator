export interface IProcessBarConfig {
    position: 'top'|'bottom'|'left'|'right'
    color: string
    errorColor: string
    duration: number
    timeGap: number
    throttle: number
    skipDuplicate: boolean
    autoFinish: boolean
}

export interface IProcessBarState {
    process: number
    type: 'normal' | 'fail'
    color: string
    timer?: any
    show: boolean
}

export interface IProcessBarMethods {
    start(skipDuplicate?: boolean): void
    finish(): void
    fail(skipDuplicate?: boolean): void
    clear(): void
}

export interface VueProcessBar extends IProcessBarMethods {
    config: IProcessBarConfig
    state: IProcessBarState
}

import { inject } from 'vue'
import {VueProcessBarInstance} from "../types";

export const useProcessBar = (): VueProcessBarInstance => {
    return inject('$process')!
}

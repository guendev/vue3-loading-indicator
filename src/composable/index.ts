import { inject } from 'vue'
import {VueProcessBar} from "../types";

export const useProcessBar = (): VueProcessBar => {
    return inject('$process')!
}

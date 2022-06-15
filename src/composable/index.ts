import { inject } from 'vue'
import {VueLoadingIndicatorInstance} from "../types";

export const useLoadingIndicator = () => {
    return inject<VueLoadingIndicatorInstance>('$loading')
}

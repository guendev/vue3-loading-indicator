import { inject } from 'vue'
import {LoadingIndicatorInstance} from "../types";

export const useLoadingIndicator = () => {
    return inject<LoadingIndicatorInstance>('$loading')
}

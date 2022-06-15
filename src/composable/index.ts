import { inject } from 'vue'
import {LoadingIndicatorInstance} from "../types";

export const useProcessBar = () => {
    return inject<LoadingIndicatorInstance>('$loading')
}

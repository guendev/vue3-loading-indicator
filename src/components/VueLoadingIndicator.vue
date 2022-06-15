<template>
  <teleport to="body">
    <div v-if="$loading.state.show" ref="container" class="vue-process-bar" :style="style">
      <div class="_process" :style="style2"></div>
    </div>
  </teleport>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'VueLoadingIndicator'
})
</script>

<script lang="ts" setup>

import {useProcessBar} from "../composable";
import {computed, CSSProperties, ref} from "vue";

const $loading = useProcessBar()

const style = computed<CSSProperties>(() => {
  return {
    top: 0,
    left: 0,
    right: 0,
    height: `${$loading?.config.throttle}px`,
  }
})

const container = ref<HTMLDivElement>()

const _width = computed(() => container.value?.scrollWidth || 0)

const style2 = computed<CSSProperties>(() => {
  return {
    background: $loading?.state.color,
    height: '100%',
    width: (($loading?.state.process || 0 ) * _width.value) / 100 + 'px',
    transition: `width ${$loading?.config.duration}ms, opacity .6s`
  }
})

</script>

<style scoped>
.vue-process-bar {
  position: fixed;
  z-index: 999999;
}
</style>

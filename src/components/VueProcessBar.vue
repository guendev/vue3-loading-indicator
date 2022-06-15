<template>
  <div v-if="$process.state.show" ref="container" class="vue-process-bar" :style="style">
    <div class="_process" :style="style2"></div>
  </div>
</template>

<script lang="ts" setup>

import {useProcessBar} from "../composable";
import {computed, CSSProperties, ref} from "vue";

const $process = useProcessBar()

const style = computed(() => {
  const _style: CSSProperties = {}
  // horizontal => set with
  switch ($process.config.position) {
    case "top":
      Object.assign(_style, {
        top: 0,
        left: 0,
        right: 0,
        height: `${$process.config.throttle}px`,
      } as CSSProperties)
          break
    case "bottom":
      Object.assign(_style, {
        bottom: 0,
        left: 0,
        right: 0,
        height: `${$process.config.throttle}px`,
      } as CSSProperties)
          break
    case "left":
      Object.assign(_style, {
        top: 0,
        left: 0,
        bottom: 0,
        width: `${$process.config.throttle}px`,
      } as CSSProperties)
          break
    case "right":
      Object.assign(_style, {
        top: 0,
        bottom: 0,
        right: 0,
        width: `${$process.config.throttle}px`,
      } as CSSProperties)
  }

  return _style
})

const container = ref<HTMLDivElement>()

const _width = computed(() => container.value?.scrollWidth || 0)
const _height = computed(() => container.value?.scrollHeight || 0)

const style2 = computed(() => {

  const _style: CSSProperties = {}

  // Global style
  _style.background = $process.config.color

  // vertical
  if(['top', 'bottom'].includes($process.config.position)) {
    _style.height = '100%'
    _style.width = ($process.state.process * _width.value) / 100 + 'px'
  } else {
    // horizontal
    _style.width = '100%'
    _style.height = ($process.state.process * _height.value) / 100 + 'px'
  }

  return _style

})

</script>

<style>
.vue-process-bar {
  position: fixed;
  z-index: 999999;
}
.vue-process-bar ._process {
  transition: 200ms linear;
}
</style>

<template>
  <div class="test">

    <vue-loading-indicator />

    <div class="container">
      <div>
        <button @click="$loading.start()">Start</button>
        <button @click="$loading.fail()">Error</button>
        <button @click="$loading.pause()">Pause</button>
        <button @click="$loading.finish()">Finish</button>
        <button @click="$loading.clear()">Clear</button>
        <button @click="$loading.increase(10)">Inc</button>
        <button @click="$loading.decrease(10)">Dec</button>

        <pre>{{$loading.state}}</pre>
      </div>

    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueProcessBar from "./components/VueLoadingIndicator.vue";

export default defineComponent({
  name: 'MainApplication',
  components: {VueProcessBar}
})
</script>

<style>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
